import { Body, Head, Html, Img, Preview } from "@react-email/components";

interface ReservationConfirmationProps {
  customerName?: string | null;
  amountCents: number;
  paidAt?: Date;
  appUrl?: string;
}

const fallbackAppUrl = "https://hiverobotics.fr";

export function ReservationConfirmation({
  customerName,
  amountCents,
  paidAt,
  appUrl = fallbackAppUrl,
}: ReservationConfirmationProps) {
  const firstName = (customerName ?? "").trim().split(/\s+/)[0] || null;
  const greeting = firstName ? `Bonjour ${firstName},` : "Bonjour,";
  const amount = (amountCents / 100).toLocaleString("fr-FR", {
    style: "currency",
    currency: "EUR",
  });
  const dateStr = (paidAt ?? new Date()).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  const heroImage = `${appUrl}/images/robot_new_gen/HelloWork.jpeg`;
  const closingImage = `${appUrl}/images/robot_new_gen/Hive-sortie_camion.jpeg`;

  return (
    <Html lang="fr">
      <Head>
        <meta name="x-apple-disable-message-reformatting" />
        <meta name="color-scheme" content="light only" />
        <meta name="supported-color-schemes" content="light only" />
      </Head>
      <Preview>Votre place est réservée. Vous faites partie des 500 premiers — voici la suite.</Preview>
      <Body style={bodyStyle}>
        <table role="presentation" width="100%" cellSpacing={0} cellPadding={0} border={0} style={{ backgroundColor: "#eef0ec" }}>
          <tbody>
            <tr>
              <td align="center" style={{ padding: "32px 12px" }}>
                <table role="presentation" width={600} cellSpacing={0} cellPadding={0} border={0} style={containerStyle}>
                  <tbody>
                    {/* Top bar */}
                    <tr>
                      <td style={{ backgroundColor: "#052e22", padding: "16px 24px" }}>
                        <table role="presentation" width="100%" cellSpacing={0} cellPadding={0} border={0}>
                          <tbody>
                            <tr>
                              <td align="left" style={{ fontFamily: "Helvetica, Arial, sans-serif", color: "#ffffff", fontSize: "16px", fontWeight: 700, letterSpacing: "0.02em" }}>
                                <table role="presentation" cellSpacing={0} cellPadding={0} border={0}>
                                  <tbody>
                                    <tr>
                                      <td style={{ paddingRight: "10px", verticalAlign: "middle" }}>
                                        <span style={{ display: "inline-block", width: "10px", height: "10px", backgroundColor: "#1aff66", borderRadius: "2px" }} />
                                      </td>
                                      <td style={{ verticalAlign: "middle", color: "#ffffff", fontFamily: "Helvetica, Arial, sans-serif", fontSize: "16px", fontWeight: 700 }}>
                                        Hive Robotics
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                              <td align="right" style={{ fontFamily: "'Courier New', Courier, monospace", color: "#1aff66", fontSize: "11px", letterSpacing: "0.15em" }}>
                                RÉSERVATION CONFIRMÉE
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>

                    {/* Hero image with overlay */}
                    <tr>
                      <td style={{ padding: 0, backgroundColor: "#0a3a2c" }}>
                        <div style={{ position: "relative", display: "block", lineHeight: 0 }}>
                          <Img src={heroImage} alt="Robot Hive en livraison" width={600} style={{ display: "block", width: "100%", maxWidth: "600px", height: "auto" }} />
                          <div style={{ position: "absolute", left: "24px", bottom: "20px", maxWidth: "calc(100% - 48px)" }}>
                            <table role="presentation" cellSpacing={0} cellPadding={0} border={0}>
                              <tbody>
                                <tr>
                                  <td style={{ backgroundColor: "#052e22", borderLeft: "3px solid #1aff66", padding: "14px 18px", fontFamily: "Helvetica, Arial, sans-serif", color: "#ffffff", fontSize: "22px", lineHeight: "26px", fontWeight: 700 }}>
                                    <div style={{ fontFamily: "'Courier New', Courier, monospace", fontSize: "10px", color: "#1aff66", letterSpacing: "0.2em", fontWeight: 400, marginBottom: "6px", textTransform: "uppercase" }}>
                                      Bienvenue à bord
                                    </div>
                                    Vous êtes l&apos;un<br />des 500 premiers.
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </td>
                    </tr>

                    {/* Body */}
                    <tr>
                      <td style={{ padding: "28px 32px 8px 32px", fontFamily: "Helvetica, Arial, sans-serif", color: "#1a1a1a" }}>
                        <h1 style={{ margin: "0 0 14px 0", fontFamily: "Helvetica, Arial, sans-serif", fontSize: "30px", lineHeight: "36px", color: "#052e22", fontWeight: 700, letterSpacing: "-0.01em" }}>
                          {greeting}<br />
                          merci d&apos;<span style={{ backgroundColor: "#1aff66", padding: "0 4px" }}>y croire</span>.
                        </h1>
                        <p style={{ margin: "0 0 12px 0", fontFamily: "Helvetica, Arial, sans-serif", fontSize: "15px", lineHeight: "24px", color: "#3a3a3a" }}>
                          Votre dépôt symbolique de <strong>{amount}</strong> est bien enregistré. Votre place parmi les <strong>500 premiers utilisateurs</strong> de Hive Robotics est officiellement réservée.
                        </p>
                        <p style={{ margin: "0 0 20px 0", fontFamily: "Helvetica, Arial, sans-serif", fontSize: "15px", lineHeight: "24px", color: "#3a3a3a" }}>
                          Nos robots arrivent dans les rues — et vous serez aux premières loges pour choisir le vôtre.
                        </p>
                        {/* Status chip */}
                        <table role="presentation" cellSpacing={0} cellPadding={0} border={0} style={{ margin: "0 0 24px 0" }}>
                          <tbody>
                            <tr>
                              <td>
                                <table role="presentation" cellSpacing={0} cellPadding={0} border={0}>
                                  <tbody>
                                    <tr>
                                      <td style={{ backgroundColor: "#052e22", color: "#ffffff", fontFamily: "'Courier New', Courier, monospace", fontSize: "10px", letterSpacing: "0.12em", padding: "7px 12px", borderRadius: "999px" }}>
                                        ✓ DÉPÔT {amount} VALIDÉ
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>

                    {/* Recap card */}
                    <tr>
                      <td style={{ padding: "0 32px 28px 32px" }}>
                        <table role="presentation" width="100%" cellSpacing={0} cellPadding={0} border={0} style={{ backgroundColor: "#f4f6f2", borderLeft: "4px solid #1aff66", borderRadius: "4px" }}>
                          <tbody>
                            <tr>
                              <td style={{ padding: "18px 20px" }}>
                                <table role="presentation" width="100%" cellSpacing={0} cellPadding={0} border={0}>
                                  <tbody>
                                    <tr>
                                      <td width="50%" style={{ verticalAlign: "top", padding: "4px 8px 4px 0" }}>
                                        <div style={{ fontFamily: "'Courier New', Courier, monospace", fontSize: "10px", color: "#7a7a7a", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "4px" }}>
                                          Montant versé
                                        </div>
                                        <div style={{ fontFamily: "Helvetica, Arial, sans-serif", fontSize: "18px", color: "#052e22", fontWeight: 700 }}>
                                          {amount}
                                        </div>
                                      </td>
                                      <td width="50%" style={{ verticalAlign: "top", padding: "4px 0 4px 8px" }}>
                                        <div style={{ fontFamily: "'Courier New', Courier, monospace", fontSize: "10px", color: "#7a7a7a", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "4px" }}>
                                          Statut
                                        </div>
                                        <div style={{ fontFamily: "Helvetica, Arial, sans-serif", fontSize: "18px", color: "#052e22", fontWeight: 700 }}>
                                          Payé&nbsp;✓
                                        </div>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>

                    {/* Section title : feuille de route */}
                    <tr>
                      <td style={{ padding: "0 32px 12px 32px" }}>
                        <h2 style={{ margin: "0 0 4px 0", fontFamily: "Helvetica, Arial, sans-serif", fontSize: "13px", color: "#1aff66", letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 700 }}>
                          La feuille de route
                        </h2>
                        <div style={{ fontFamily: "Helvetica, Arial, sans-serif", fontSize: "22px", color: "#052e22", fontWeight: 700, lineHeight: "28px" }}>
                          Voici ce qui vous attend.
                        </div>
                      </td>
                    </tr>

                    {/* Timeline */}
                    <tr>
                      <td style={{ padding: "8px 32px 8px 32px" }}>
                        <TimelineStep
                          highlight
                          period="Aujourd'hui"
                          title="Place réservée — paiement validé"
                          description="Vous êtes officiellement sur la liste des 500 fondateurs."
                        />
                        <TimelineStep
                          period="Dans ~30 jours"
                          title="Lancement de la campagne"
                          description={
                            <>Vous recevrez un email <strong>24h avant l&apos;ouverture publique</strong> pour choisir vos parts en avant-première.</>
                          }
                        />
                        <TimelineStep
                          period="Fin d'été 2026"
                          title="Déploiement des robots"
                          description="Premiers robots dans les rues. La flotte se met en route."
                        />
                        <TimelineStep
                          period="Q4 2026"
                          title="Vos premiers revenus 💚"
                          description="Les robots travaillent, votre investissement aussi. Premiers retours pour les détenteurs de parts."
                        />
                      </td>
                    </tr>

                    {/* Privilèges block */}
                    <tr>
                      <td style={{ padding: "28px 32px 28px 32px" }}>
                        <table role="presentation" width="100%" cellSpacing={0} cellPadding={0} border={0} style={{ backgroundColor: "#052e22", borderRadius: "6px" }}>
                          <tbody>
                            <tr>
                              <td style={{ padding: "24px 26px" }}>
                                <div style={{ fontFamily: "'Courier New', Courier, monospace", fontSize: "10px", color: "#1aff66", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "6px" }}>
                                  ★ Founder · 4 privilèges
                                </div>
                                <h3 style={{ margin: "0 0 16px 0", fontFamily: "Helvetica, Arial, sans-serif", fontSize: "24px", lineHeight: "30px", color: "#ffffff", fontWeight: 700 }}>
                                  Vos avantages pionniers
                                </h3>
                                <Perk
                                  index="01"
                                  title="Accès 24h avant le public"
                                  description="Le jour du lancement, la plateforme s'ouvre pour vous d'abord. Premier choix sur les robots."
                                  borderBottom
                                />
                                <Perk
                                  index="02"
                                  title="−5 % sur chaque part"
                                  description="Réduction exclusive réservée aux 500 fondateurs. Sur toutes vos parts, sans plafond."
                                  borderBottom
                                />
                                <Perk
                                  index="03"
                                  title="10 000 € de parts offertes"
                                  description="10 gagnants tirés au sort × 1 000 € de parts. Vous êtes automatiquement dans le tirage."
                                  borderBottom
                                />
                                <Perk
                                  index="04"
                                  title="1 € remboursable à tout moment"
                                  description="Aucun engagement. Une simple demande suffit, on vous rembourse — promis."
                                />
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>

                    {/* Closing image */}
                    <tr>
                      <td style={{ padding: "8px 32px 24px 32px" }}>
                        <table role="presentation" width="100%" cellSpacing={0} cellPadding={0} border={0} style={{ borderRadius: "6px", overflow: "hidden" }}>
                          <tbody>
                            <tr>
                              <td style={{ padding: 0, backgroundColor: "#0a3a2c" }}>
                                <Img src={closingImage} alt="La flotte Hive en route" width={536} style={{ display: "block", width: "100%", maxWidth: "536px", height: "auto", border: 0 }} />
                              </td>
                            </tr>
                            <tr>
                              <td style={{ backgroundColor: "#052e22", padding: "14px 18px", fontFamily: "'Courier New', Courier, monospace", fontSize: "11px", letterSpacing: "0.15em", color: "#1aff66", textTransform: "uppercase" }}>
                                → La flotte se prépare. À très vite.
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>

                    {/* Sign-off */}
                    <tr>
                      <td style={{ padding: "0 32px 28px 32px", fontFamily: "Helvetica, Arial, sans-serif", color: "#3a3a3a" }}>
                        <p style={{ margin: "0 0 8px 0", fontSize: "15px", lineHeight: "23px" }}>
                          À très vite pour la suite,
                        </p>
                        <p style={{ margin: 0, fontFamily: "Helvetica, Arial, sans-serif", fontSize: "15px", lineHeight: "23px", color: "#052e22", fontWeight: 700 }}>
                          — L&apos;équipe Hive
                        </p>
                      </td>
                    </tr>

                    {/* Divider */}
                    <tr>
                      <td style={{ padding: "0 32px" }}>
                        <table role="presentation" width="100%" cellSpacing={0} cellPadding={0} border={0}>
                          <tbody>
                            <tr>
                              <td height={1} style={{ backgroundColor: "#e3e6df", fontSize: 0, lineHeight: 0 }}>&nbsp;</td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>

                    {/* Footer */}
                    <tr>
                      <td style={{ padding: "20px 32px 32px 32px" }}>
                        <p style={{ margin: "0 0 8px 0", fontFamily: "Helvetica, Arial, sans-serif", fontSize: "13px", lineHeight: "20px", color: "#7a7a7a" }}>
                          Une question ? Répondez simplement à cet email — on lit tout, on répond vite.
                        </p>
                        <p style={{ margin: 0, fontFamily: "'Courier New', Courier, monospace", fontSize: "11px", lineHeight: "18px", color: "#9a9a9a", letterSpacing: "0.05em" }}>
                          Hive Robotics · {amount} remboursable sans condition<br />
                          Vous recevez cet email car vous avez réservé votre place le {dateStr}.
                        </p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </Body>
    </Html>
  );
}

function TimelineStep({
  period,
  title,
  description,
  highlight,
}: {
  period: string;
  title: string;
  description: React.ReactNode;
  highlight?: boolean;
}) {
  const dotStyle: React.CSSProperties = highlight
    ? { backgroundColor: "#1aff66", fontSize: 0, lineHeight: 0 }
    : { backgroundColor: "#ffffff", border: "2px solid #052e22", fontSize: 0, lineHeight: 0 };
  const periodColor = highlight ? "#1aff66" : "#7a7a7a";
  const periodWeight = highlight ? 700 : 400;
  return (
    <table role="presentation" width="100%" cellSpacing={0} cellPadding={0} border={0}>
      <tbody>
        <tr>
          <td width={40} valign="top" style={{ paddingTop: "4px" }}>
            <table role="presentation" cellSpacing={0} cellPadding={0} border={0}>
              <tbody>
                <tr>
                  <td width={22} height={22} style={dotStyle}>&nbsp;</td>
                </tr>
              </tbody>
            </table>
          </td>
          <td valign="top" style={{ paddingBottom: "18px" }}>
            <div style={{ fontFamily: "'Courier New', Courier, monospace", fontSize: "10px", color: periodColor, letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: periodWeight }}>
              {period}
            </div>
            <div style={{ fontFamily: "Helvetica, Arial, sans-serif", fontSize: "16px", color: "#052e22", fontWeight: 700, marginTop: "4px" }}>
              {title}
            </div>
            <div style={{ fontFamily: "Helvetica, Arial, sans-serif", fontSize: "14px", color: "#5a5a5a", lineHeight: "20px", marginTop: "4px" }}>
              {description}
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

function Perk({
  index,
  title,
  description,
  borderBottom,
}: {
  index: string;
  title: string;
  description: string;
  borderBottom?: boolean;
}) {
  return (
    <table role="presentation" width="100%" cellSpacing={0} cellPadding={0} border={0} style={borderBottom ? { borderBottom: "1px solid rgba(26,255,102,0.18)" } : undefined}>
      <tbody>
        <tr>
          <td width={32} valign="top" style={{ padding: "12px 0" }}>
            <table role="presentation" cellSpacing={0} cellPadding={0} border={0}>
              <tbody>
                <tr>
                  <td width={22} height={22} style={{ backgroundColor: "#1aff66", borderRadius: "4px", fontFamily: "Helvetica, Arial, sans-serif", fontSize: "13px", fontWeight: 700, color: "#052e22", textAlign: "center", lineHeight: "22px" }}>
                    {index}
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
          <td valign="top" style={{ padding: borderBottom ? "12px 0 12px 12px" : "12px 0 0 12px" }}>
            <div style={{ fontFamily: "Helvetica, Arial, sans-serif", fontSize: "15px", color: "#ffffff", fontWeight: 700 }}>
              {title}
            </div>
            <div style={{ fontFamily: "Helvetica, Arial, sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.7)", lineHeight: "19px", marginTop: "3px" }}>
              {description}
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default ReservationConfirmation;

const bodyStyle: React.CSSProperties = {
  backgroundColor: "#eef0ec",
  fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif",
  margin: 0,
  padding: 0,
};

const containerStyle: React.CSSProperties = {
  width: "600px",
  maxWidth: "600px",
  background: "#ffffff",
  borderRadius: "8px",
  overflow: "hidden",
  boxShadow: "0 2px 8px rgba(5,46,34,0.08)",
};
