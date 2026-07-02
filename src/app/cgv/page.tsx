import { LegalPageShell } from "@/components/legal-page-shell";

export const metadata = {
  title: "Conditions Générales de Vente · Hive Robotics",
  description: "Conditions Générales de Vente de Hive Robotics.",
};

export default function CgvPage() {
  return (
    <LegalPageShell title="Conditions Générales de Vente">
      <h2>1. Objet</h2>
      <p>
        Les présentes Conditions Générales de Vente (CGV) régissent les
        relations contractuelles entre Hive Robotics SAS et toute personne
        souscrivant à une offre de réservation ou d&apos;investissement via le
        site.
      </p>

      <h2>2. Réservation</h2>
      <p>
        La réservation d&apos;une place en avant-première, au tarif de 1 €,
        permet à l&apos;utilisateur d&apos;accéder à la campagne
        d&apos;investissement 48 heures avant son ouverture publique. Cette
        réservation ne constitue pas un engagement d&apos;investissement.
      </p>

      <h2>3. Prix et paiement</h2>
      <p>
        Les prix sont indiqués en euros, toutes taxes comprises. Le paiement
        s&apos;effectue en ligne de manière sécurisée via Stripe.
      </p>

      <h2>4. Droit de rétractation</h2>
      <p>
        Conformément à l&apos;article L.221-18 du Code de la consommation,
        l&apos;utilisateur dispose d&apos;un délai de 14 jours pour exercer son
        droit de rétractation à compter du paiement de sa réservation, sauf
        exceptions prévues par la loi.
      </p>

      <h2>5. Investissement</h2>
      <p>
        Les modalités de l&apos;investissement (achat de parts de robots) sont
        précisées dans le Document d&apos;Information Synthétique (DIS) et
        dans le contrat d&apos;investissement qui sera signé lors de la
        souscription effective.
      </p>

      <h2>6. Responsabilité</h2>
      <p>
        Hive Robotics ne saurait être tenue responsable des dommages directs
        ou indirects résultant de l&apos;utilisation du site ou de la
        souscription à une offre, dans les limites prévues par la loi.
      </p>

      <h2>7. Droit applicable</h2>
      <p>
        Les présentes CGV sont soumises au droit français. Tout litige sera
        soumis à la compétence exclusive des tribunaux français.
      </p>
    </LegalPageShell>
  );
}
