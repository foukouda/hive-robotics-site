import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

export interface InternalLeadNotificationProps {
  email: string;
  name?: string | null;
  phone?: string | null;
  address?: {
    line1?: string | null;
    line2?: string | null;
    postal_code?: string | null;
    city?: string | null;
    state?: string | null;
    country?: string | null;
  } | null;
  amountCents: number;
  stripeCheckoutSessionId: string;
  stripeCustomerId?: string | null;
}

export function InternalLeadNotification({
  email,
  name,
  phone,
  address,
  amountCents,
  stripeCheckoutSessionId,
  stripeCustomerId,
}: InternalLeadNotificationProps) {
  const amount = (amountCents / 100).toLocaleString("fr-FR", {
    style: "currency",
    currency: "EUR",
  });
  const fullAddress = address
    ? [
        address.line1,
        address.line2,
        [address.postal_code, address.city].filter(Boolean).join(" "),
        address.state,
        address.country,
      ]
        .filter(Boolean)
        .join(", ")
    : null;

  return (
    <Html lang="fr">
      <Head />
      <Preview>Nouveau lead Hive Robotics — {email}</Preview>
      <Body style={body}>
        <Container style={container}>
          <Section style={header}>
            <Heading style={brand}>Nouveau lead</Heading>
            <Text style={subBrand}>Réservation Hive Robotics — {amount}</Text>
          </Section>

          <Section style={content}>
            <Row label="Email" value={email} />
            {name && <Row label="Nom" value={name} />}
            {phone && <Row label="Téléphone" value={phone} />}
            {fullAddress && <Row label="Adresse" value={fullAddress} />}
            <Row label="Montant" value={amount} />
            <Row label="Stripe session" value={stripeCheckoutSessionId} mono />
            {stripeCustomerId && (
              <Row label="Stripe customer" value={stripeCustomerId} mono />
            )}
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

function Row({
  label,
  value,
  mono,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <Section style={row}>
      <Text style={rowLabel}>{label}</Text>
      <Text style={mono ? rowValueMono : rowValue}>{value}</Text>
    </Section>
  );
}

export default InternalLeadNotification;

const body: React.CSSProperties = {
  backgroundColor: "#F7F9FC",
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  margin: 0,
  padding: 0,
};
const container: React.CSSProperties = {
  margin: "0 auto",
  maxWidth: "560px",
  padding: "32px 0",
};
const header: React.CSSProperties = {
  backgroundColor: "#0A0F1E",
  borderRadius: "12px 12px 0 0",
  padding: "20px 24px",
};
const brand: React.CSSProperties = {
  color: "#00E85C",
  fontSize: "18px",
  fontWeight: 700,
  margin: 0,
};
const subBrand: React.CSSProperties = {
  color: "#FFFFFF",
  fontSize: "13px",
  margin: "4px 0 0",
};
const content: React.CSSProperties = {
  backgroundColor: "#FFFFFF",
  borderRadius: "0 0 12px 12px",
  padding: "8px 24px 24px",
};
const row: React.CSSProperties = {
  borderBottom: "1px solid #E8ECF4",
  padding: "12px 0",
};
const rowLabel: React.CSSProperties = {
  color: "#718096",
  fontSize: "12px",
  fontWeight: 600,
  letterSpacing: "0.05em",
  textTransform: "uppercase",
  margin: "0 0 4px",
};
const rowValue: React.CSSProperties = {
  color: "#0A0F1E",
  fontSize: "15px",
  margin: 0,
};
const rowValueMono: React.CSSProperties = {
  color: "#0A0F1E",
  fontFamily:
    'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace',
  fontSize: "13px",
  margin: 0,
  wordBreak: "break-all",
};
