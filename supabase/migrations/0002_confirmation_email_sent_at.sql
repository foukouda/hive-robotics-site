-- Idempotence guard: when set, skip resending the confirmation email
-- (Stripe may retry checkout.session.completed webhooks).
alter table public.reservations
  add column if not exists confirmation_email_sent_at timestamptz;
