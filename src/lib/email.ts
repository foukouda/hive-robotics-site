import { Resend } from "resend";
import { ReservationConfirmation } from "@/emails/reservation-confirmation";
import {
  InternalLeadNotification,
  type InternalLeadNotificationProps,
} from "@/emails/internal-lead-notification";

const resendApiKey = process.env.RESEND_API_KEY;
const fromAddress =
  process.env.RESEND_FROM_EMAIL ?? "Hive Robotics <noreply@hiverobotics.fr>";
const internalRecipients = (process.env.INTERNAL_NOTIFICATION_EMAILS ?? "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

const resend = resendApiKey ? new Resend(resendApiKey) : null;

export type SendReservationEmailsArgs = InternalLeadNotificationProps;

export async function sendReservationEmails(args: SendReservationEmailsArgs) {
  if (!resend) {
    console.warn("[email] RESEND_API_KEY missing — skipping email send");
    return { customerSent: false, internalSent: false };
  }

  const customerPromise = resend.emails.send({
    from: fromAddress,
    to: args.email,
    subject: "Votre place est réservée — Hive Robotics",
    react: ReservationConfirmation({
      customerName: args.name ?? null,
      amountCents: args.amountCents,
      paidAt: new Date(),
      // Toujours l'URL publique (même en local) pour que les images puissent
      // se charger côté client mail (Gmail/Outlook ne peuvent pas atteindre localhost).
    }),
  });

  const internalPromise =
    internalRecipients.length > 0
      ? resend.emails.send({
          from: fromAddress,
          to: internalRecipients,
          subject: `Nouveau lead — ${args.email}`,
          react: InternalLeadNotification(args),
        })
      : Promise.resolve(null);

  const [customerResult, internalResult] = await Promise.allSettled([
    customerPromise,
    internalPromise,
  ]);

  const customerSent =
    customerResult.status === "fulfilled" && !customerResult.value.error;
  const internalSent =
    internalResult.status === "fulfilled" &&
    (internalResult.value === null || !internalResult.value.error);

  if (customerResult.status === "rejected") {
    console.error("[email] customer send rejected:", customerResult.reason);
  } else if (customerResult.value.error) {
    console.error("[email] customer send error:", customerResult.value.error);
  }
  if (internalResult.status === "rejected") {
    console.error("[email] internal send rejected:", internalResult.reason);
  } else if (internalResult.value && internalResult.value.error) {
    console.error("[email] internal send error:", internalResult.value.error);
  }

  return { customerSent, internalSent };
}
