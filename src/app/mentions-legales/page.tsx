import { LegalPageShell } from "@/components/legal-page-shell";

export const metadata = {
  title: "Mentions légales · Hive Robotics",
  description: "Mentions légales du site Hive Robotics.",
};

export default function MentionsLegalesPage() {
  return (
    <LegalPageShell title="Mentions légales">
      <h2>Éditeur du site</h2>
      <p>
        Le site est édité par <strong>Hive Robotics SAS</strong>.
      </p>
      <ul>
        <li>Forme juridique : [à compléter]</li>
        <li>Capital social : [à compléter]</li>
        <li>Siège social : [à compléter]</li>
        <li>RCS : [à compléter]</li>
        <li>SIRET : [à compléter]</li>
        <li>N° TVA intracommunautaire : [à compléter]</li>
        <li>Directeur de la publication : [à compléter]</li>
        <li>
          Contact :{" "}
          <a href="mailto:thomas.raynal@hiverobotics.fr">
            thomas.raynal@hiverobotics.fr
          </a>
        </li>
      </ul>

      <h2>Hébergeur</h2>
      <p>
        Le site est hébergé par <strong>Vercel Inc.</strong>
        <br />
        440 N Barranca Ave #4133, Covina, CA 91723, États-Unis.
        <br />
        Site web :{" "}
        <a
          href="https://vercel.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          vercel.com
        </a>
      </p>

      <h2>Propriété intellectuelle</h2>
      <p>
        L&apos;ensemble des contenus présents sur le site (textes, images,
        logos, vidéos, graphismes) sont la propriété exclusive de Hive Robotics
        SAS ou de ses partenaires, et sont protégés par le droit de la
        propriété intellectuelle. Toute reproduction, représentation ou
        exploitation, totale ou partielle, sans autorisation écrite préalable
        est interdite.
      </p>

      <h2>Responsabilité</h2>
      <p>
        Hive Robotics s&apos;efforce d&apos;assurer l&apos;exactitude des
        informations publiées sur le site. Toutefois, les informations à
        caractère financier présentées sont des estimations et ne constituent
        en aucun cas une garantie de performance.
      </p>
    </LegalPageShell>
  );
}
