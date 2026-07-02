import { LegalPageShell } from "@/components/legal-page-shell";

export const metadata = {
  title: "Document d'Information Synthétique · Hive Robotics",
  description:
    "Document d'Information Synthétique (DIS) relatif à l'offre d'investissement Hive Robotics.",
};

export default function DisPage() {
  return (
    <LegalPageShell title="Document d'Information Synthétique (DIS)">
      <p>
        Le Document d&apos;Information Synthétique (DIS) est un document
        réglementaire prévu par l&apos;Autorité des Marchés Financiers (AMF).
        Il présente, de manière claire et synthétique, les caractéristiques
        essentielles de l&apos;offre d&apos;investissement proposée par Hive
        Robotics, ainsi que les risques associés.
      </p>

      <h2>Ce que contient le DIS</h2>
      <ul>
        <li>Présentation de la société et de son activité</li>
        <li>Description détaillée de l&apos;offre d&apos;investissement</li>
        <li>Modalités de souscription et de sortie</li>
        <li>Facteurs de risque</li>
        <li>Informations financières</li>
        <li>Frais et fiscalité</li>
      </ul>

      <h2>Disponibilité</h2>
      <p>
        Le DIS sera mis à disposition au format PDF téléchargeable avant
        l&apos;ouverture publique de la campagne d&apos;investissement.
      </p>

      <h2>Avertissement</h2>
      <p>
        L&apos;investissement dans des parts de robots Hive Robotics présente
        un risque de perte en capital. Les performances passées ne préjugent
        pas des performances futures. Avant toute décision d&apos;investir,
        nous vous invitons à lire attentivement l&apos;intégralité du DIS.
      </p>
    </LegalPageShell>
  );
}
