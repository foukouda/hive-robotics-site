import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { stripe } from "@/lib/stripe";

export const dynamic = "force-dynamic";

export default async function ReservationSuccess({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id } = await searchParams;

  let email: string | null = null;
  if (session_id) {
    try {
      const session = await stripe.checkout.sessions.retrieve(session_id);
      email = session.customer_details?.email ?? null;
    } catch {
      // ignore — fall back to generic message
    }
  }

  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="max-w-md text-center">
        <div className="w-16 h-16 rounded-full bg-[#E8F5EC] flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-8 h-8 text-[#1B3D2C]" />
        </div>
        <h1 className="text-3xl font-bold text-[#0A0F1E] mb-4">
          Réservation confirmée !
        </h1>
        <p className="text-[#4A5568] text-lg mb-8 leading-relaxed">
          Votre dépôt de 1&nbsp;&euro; a été enregistré.{" "}
          {email ? (
            <>
              Un email de confirmation a été envoyé à{" "}
              <span className="font-semibold text-[#0A0F1E]">{email}</span>.
            </>
          ) : (
            <>
              Vous recevrez un email de confirmation avec les détails de votre
              accès en avant-première.
            </>
          )}
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 bg-[#1B3D2C] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#152F22] transition-colors"
        >
          Retour à l&apos;accueil
        </Link>
      </div>
    </main>
  );
}
