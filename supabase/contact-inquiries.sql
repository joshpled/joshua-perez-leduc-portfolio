-- Apply in the existing poll project's SQL Editor. Does not touch poll tables.
begin;

create table public.contact_inquiries (
  id text primary key check (id ~ '^[a-f0-9]{64}$'),
  created_at timestamptz not null default now(),
  name text not null check (char_length(btrim(name)) between 1 and 120 and name !~ '[[:cntrl:]]'),
  email text not null check (char_length(email) between 3 and 254 and email ~ '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$'),
  company text not null default '' check (char_length(company) <= 120 and company !~ '[[:cntrl:]]'),
  message text not null check (char_length(btrim(message)) between 10 and 5000)
);

alter table public.contact_inquiries enable row level security;
-- Default table grants may expose a newly created table. Remove them explicitly.
revoke all on public.contact_inquiries from public, anon, authenticated, service_role;
-- Vercel uses a private secret key (service_role), after checking Turnstile.
-- No visitor role gets direct insert access, so the spam check cannot be bypassed.
grant insert (id, name, email, company, message) on public.contact_inquiries to service_role;
-- PostgREST's explicit conflict target needs SELECT on the target column only.
grant select (id) on public.contact_inquiries to service_role;

comment on table public.contact_inquiries is 'Private website inquiries. Review in the owner dashboard; no email notification. Vercel inserts after spam verification.';
notify pgrst, 'reload schema';
commit;
