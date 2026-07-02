import { NextRequest } from "next/server";
import { stripe } from "@/lib/stripe";
import { createAdminClient } from "@/lib/supabase/admin";
import { sendReservationEmails } from "@/lib/email";

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return Response.json({ error: "Missing signature" }, { status: 400 });
  }

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return Response.json(
      { error: `Webhook signature verification failed: ${message}` },
      { status: 400 }
    );
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const details = session.customer_details;

    if (!details?.email) {
      return Response.json(
        { error: "Missing customer details" },
        { status: 400 }
      );
    }

    const supabase = createAdminClient();
    const amountCents = session.amount_total ?? 0;
    const stripeCustomerId =
      typeof session.customer === "string" ? session.customer : null;
    const address = details.address
      ? {
          line1: details.address.line1 ?? null,
          line2: details.address.line2 ?? null,
          postal_code: details.address.postal_code ?? null,
          city: details.address.city ?? null,
          state: details.address.state ?? null,
          country: details.address.country ?? null,
        }
      : null;

    const { data: row, error } = await supabase
      .from("reservations")
      .upsert(
        {
          email: details.email,
          name: details.name ?? null,
          phone: details.phone ?? null,
          address,
          stripe_customer_id: stripeCustomerId,
          stripe_checkout_session_id: session.id,
          stripe_payment_intent_id:
            typeof session.payment_intent === "string"
              ? session.payment_intent
              : null,
          amount_cents: amountCents,
          status: "paid",
          paid_at: new Date().toISOString(),
        },
        { onConflict: "stripe_checkout_session_id" }
      )
      .select("id, confirmation_email_sent_at")
      .single();

    if (error || !row) {
      console.error("Failed to upsert reservation:", error);
      return Response.json(
        { error: "Failed to insert reservation" },
        { status: 500 }
      );
    }

    if (!row.confirmation_email_sent_at) {
      const { customerSent } = await sendReservationEmails({
        email: details.email,
        name: details.name ?? null,
        phone: details.phone ?? null,
        address,
        amountCents,
        stripeCheckoutSessionId: session.id,
        stripeCustomerId,
      });

      if (customerSent) {
        const { error: stampError } = await supabase
          .from("reservations")
          .update({ confirmation_email_sent_at: new Date().toISOString() })
          .eq("id", row.id);
        if (stampError) {
          console.error(
            "Failed to stamp confirmation_email_sent_at:",
            stampError
          );
        }
      }
    }
  }

  return Response.json({ received: true });
}
