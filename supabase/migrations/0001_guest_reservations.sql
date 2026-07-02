-- Reservations table for guest checkout (no Supabase Auth required).
-- Profile is created from Stripe customer_details after a successful payment.

create table if not exists public.reservations (
  id uuid primary key default gen_random_uuid (),
  email text not null,
  name text,
  phone text,
  address jsonb,
  stripe_customer_id text,
  stripe_checkout_session_id text not null unique,
  stripe_payment_intent_id text,
  amount_cents integer not null default 0,
  status text not null default 'paid' check (status in ('pending', 'paid', 'refunded', 'failed')),
  paid_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists reservations_email_idx on public.reservations (email);
create index if not exists reservations_stripe_customer_idx on public.reservations (stripe_customer_id);
create index if not exists reservations_paid_at_idx on public.reservations (paid_at desc);

-- Realtime: the sidebar subscribes to postgres_changes on this table.
alter publication supabase_realtime add table public.reservations;

-- RLS: lock everything down. The webhook uses the service role (bypasses RLS),
-- and the public count is fetched via a SECURITY DEFINER RPC.
alter table public.reservations enable row level security;

-- Public counter RPC (no PII exposed).
create or replace function public.get_reservation_count ()
returns integer
language sql
security definer
set search_path = public
as $$
  select count(*)::int from public.reservations where status = 'paid';
$$;

grant execute on function public.get_reservation_count () to anon, authenticated;
