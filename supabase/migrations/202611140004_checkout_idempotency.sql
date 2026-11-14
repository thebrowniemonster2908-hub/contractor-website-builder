-- Future activation prerequisite: verify the existing orders/websites schema first.
alter table public.orders add column if not exists submission_id text;
alter table public.orders add column if not exists submission_hash text;
create unique index if not exists orders_submission_id_unique on public.orders(submission_id) where submission_id is not null;
create unique index if not exists websites_order_id_unique on public.websites(order_id);
create table if not exists public.builder_payment_events(event_id text primary key,received_at timestamptz not null default now());
alter table public.builder_payment_events enable row level security;
revoke all on public.builder_payment_events from public,anon,authenticated;
grant all on public.builder_payment_events to service_role;
create or replace function public.complete_builder_checkout(p_event_id text,p_session_id text,p_payment_intent text)
returns boolean language plpgsql security definer set search_path=pg_catalog,public as $$
declare o public.orders;
begin
 insert into public.builder_payment_events(event_id) values(p_event_id) on conflict do nothing;
 if not found then return true; end if;
 select * into o from public.orders where stripe_session_id=p_session_id for update;
 if not found then raise exception 'Unknown checkout session'; end if;
 update public.orders set status='completed',paid_at=now(),stripe_payment_intent=p_payment_intent where id=o.id;
 insert into public.websites(order_id,business_name,template_id,data,deployed_at,status)
 values(o.id,o.business_name,o.template_id,jsonb_build_object('businessName',o.business_name,'serviceType',o.service_type,'phone',o.phone,'email',o.email,'address',o.address,'tagline',o.tagline,'ownerName',o.owner_name,'ownerBio',o.owner_bio,'ownerImage',o.owner_image,'services',o.services,'testimonials',o.testimonials),now(),'published')
 on conflict(order_id) do nothing;
 return true;
end;
$$;
revoke all on function public.complete_builder_checkout(text,text,text) from public,anon,authenticated;
grant execute on function public.complete_builder_checkout(text,text,text) to service_role;
