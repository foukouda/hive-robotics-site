import { LegalPageShell } from "@/components/legal-page-shell";

export const metadata = {
  title: "Politique de confidentialité · Hive Robotics",
  description:
    "Politique de confidentialité et de protection des données personnelles de Hive Robotics.",
};

export default function ConfidentialitePage() {
  return (
    <LegalPageShell title="Politique de confidentialité">
      <p>
        Hive Robotics SAS (« Hive », « nous ») accorde une importance
        particulière à la protection de vos données personnelles. La présente
        politique explique quelles données sont collectées, pourquoi, et
        comment vous pouvez exercer vos droits.
      </p>

      <h2>1. Responsable du traitement</h2>
      <p>
        Hive Robotics SAS, dont les coordonnées figurent dans les mentions
        légales, est responsable du traitement de vos données personnelles.
      </p>

      <h2>2. Données collectées</h2>
      <ul>
        <li>
          <strong>Identification</strong> : nom, prénom, adresse e-mail
        </li>
        <li>
          <strong>Paiement</strong> : les informations bancaires sont traitées
          exclusivement par notre prestataire Stripe ; nous ne les stockons
          pas
        </li>
        <li>
          <strong>Navigation</strong> : données techniques anonymisées
          (adresse IP, type de navigateur, pages visitées)
        </li>
      </ul>

      <h2>3. Finalités</h2>
      <ul>
        <li>Gestion de votre réservation et de votre compte</li>
        <li>Communication relative à la campagne d&apos;investissement</li>
        <li>Respect de nos obligations légales et réglementaires</li>
        <li>Amélioration du site et de nos services</li>
      </ul>

      <h2>4. Durée de conservation</h2>
      <p>
        Vos données sont conservées pendant la durée nécessaire aux finalités
        pour lesquelles elles sont collectées, augmentée des durées légales de
        conservation applicables.
      </p>

      <h2>5. Vos droits</h2>
      <p>
        Conformément au Règlement Général sur la Protection des Données
        (RGPD), vous disposez des droits d&apos;accès, de rectification,
        d&apos;effacement, de limitation, de portabilité et d&apos;opposition
        concernant vos données.
      </p>
      <p>
        Pour exercer vos droits, contactez-nous à :{" "}
        <a href="mailto:thomas.raynal@hiverobotics.fr">
          thomas.raynal@hiverobotics.fr
        </a>
      </p>

      <h2>6. Cookies</h2>
      <p>
        Le site utilise des cookies strictement nécessaires à son
        fonctionnement ainsi que, le cas échéant, des cookies de mesure
        d&apos;audience. Une bannière de gestion des cookies sera mise en
        place avant l&apos;ouverture publique de la campagne.
      </p>

      <h2>7. Réclamation</h2>
      <p>
        Vous disposez du droit d&apos;introduire une réclamation auprès de la
        CNIL (
        <a
          href="https://www.cnil.fr"
          target="_blank"
          rel="noopener noreferrer"
        >
          cnil.fr
        </a>
        ).
      </p>
    </LegalPageShell>
  );
}
