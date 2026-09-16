-- Run as postgres in Supabase SQL Editor after the schema. All writes roll back.
begin;
insert into public.contact_inquiries (id, name, email, message)
values (repeat('a', 64), 'Database test', 'test@example.com', 'Temporary database permission check.');

set local role anon;
do $$ begin
  begin perform name from public.contact_inquiries; raise exception 'FAIL: anonymous read allowed'; exception when insufficient_privilege then null; end;
  begin insert into public.contact_inquiries (id,name,email,message) values(repeat('b',64),'Test','test@example.com','Test anonymous submission.'); raise exception 'FAIL: anonymous insert allowed'; exception when insufficient_privilege then null; end;
  begin update public.contact_inquiries set message='Unauthorized modification.'; raise exception 'FAIL: anonymous update allowed'; exception when insufficient_privilege then null; end;
  begin delete from public.contact_inquiries; raise exception 'FAIL: anonymous delete allowed'; exception when insufficient_privilege then null; end;
end $$;
reset role;
set local role authenticated;
do $$ begin
  begin perform name from public.contact_inquiries; raise exception 'FAIL: signed-in read allowed'; exception when insufficient_privilege then null; end;
  begin insert into public.contact_inquiries (id,name,email,message) values(repeat('b',64),'Test','test@example.com','Test signed-in submission.'); raise exception 'FAIL: signed-in insert allowed'; exception when insufficient_privilege then null; end;
  begin update public.contact_inquiries set message='Unauthorized modification.'; raise exception 'FAIL: signed-in update allowed'; exception when insufficient_privilege then null; end;
  begin delete from public.contact_inquiries; raise exception 'FAIL: signed-in delete allowed'; exception when insufficient_privilege then null; end;
end $$;
reset role;
set local role service_role;
insert into public.contact_inquiries (id,name,email,company,message)
values(repeat('b',64),'Test','test@example.com','','Valid server-side inquiry.') on conflict(id) do nothing;
insert into public.contact_inquiries (id,name,email,company,message)
values(repeat('b',64),'Test','test@example.com','','Valid server-side inquiry.') on conflict(id) do nothing;
do $$ begin
  begin perform message from public.contact_inquiries; raise exception 'FAIL: server read allowed'; exception when insufficient_privilege then null; end;
  begin update public.contact_inquiries set message='Unauthorized modification.'; raise exception 'FAIL: server update allowed'; exception when insufficient_privilege then null; end;
  begin delete from public.contact_inquiries; raise exception 'FAIL: server delete allowed'; exception when insufficient_privilege then null; end;
  begin insert into public.contact_inquiries (id,name,email,message) values(repeat('c',64),'Test','test@example.com','short'); raise exception 'FAIL: invalid message allowed'; exception when check_violation then null; end;
  begin insert into public.contact_inquiries (id,created_at,name,email,message) values(repeat('c',64),now(),'Test','test@example.com','Trying to set the timestamp.'); raise exception 'FAIL: timestamp override allowed'; exception when insufficient_privilege then null; end;
end $$;
reset role;
do $$ begin
  if (select count(*) from public.contact_inquiries where id=repeat('b',64)) <> 1 then raise exception 'FAIL: retry duplicated'; end if;
  if not (select relrowsecurity from pg_class where oid='public.contact_inquiries'::regclass) then raise exception 'FAIL: RLS disabled'; end if;
end $$;
select 'PASS: server insert and deduplication; private reads, edits, deletes, direct submissions and invalid data denied' as result;
rollback;
