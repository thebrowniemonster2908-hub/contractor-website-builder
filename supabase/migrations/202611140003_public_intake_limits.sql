-- Optional future launch prerequisite. Do not activate any dormant integration.
create table if not exists public.security_intake_buckets (bucket text primary key, expires_at timestamptz not null, attempts integer not null);
alter table public.security_intake_buckets enable row level security;
revoke all on public.security_intake_buckets from public,anon,authenticated;
grant all on public.security_intake_buckets to service_role;
create or replace function public.security_claim_public_intake(p_scope text,p_identity text)
returns boolean language plpgsql security definer set search_path=pg_catalog,public as $$
declare slot bigint:=floor(extract(epoch from statement_timestamp())/900); expiry timestamptz:=to_timestamp((slot+1)*900); total integer; individual integer;
begin
 if p_scope not in ('longevity-quiz','performance-profile','contractor-builder','clearline') or p_identity !~ '^[a-f0-9]{64}$' then return false; end if;
 delete from public.security_intake_buckets where expires_at<statement_timestamp()-interval '15 minutes';
 insert into public.security_intake_buckets values(p_scope||':global:'||slot,expiry,1)
 on conflict(bucket) do update set attempts=least(security_intake_buckets.attempts+1,101) returning attempts into total;
 if total>100 then return false; end if;
 insert into public.security_intake_buckets values(p_scope||':ip:'||slot||':'||p_identity,expiry,1)
 on conflict(bucket) do update set attempts=least(security_intake_buckets.attempts+1,4) returning attempts into individual;
 return individual<=3;
end;
$$;
revoke all on function public.security_claim_public_intake(text,text) from public,anon,authenticated;
grant execute on function public.security_claim_public_intake(text,text) to service_role;
