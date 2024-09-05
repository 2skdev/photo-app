-- CreateFunction
create or replace function public.insert_hashtag()
returns trigger
as $$
begin
    delete from public."Hashtag" where "Hashtag"."postId" = new."id";

    insert into public."Hashtag"("postId", "tag")
    select
        new."id" AS postId,
        unnest(regexp_matches(new."text", '\s#(\w+)', 'g')) as tag
    ;

    return new;
end;
$$
language plpgsql
security definer set search_path = public
;

-- CreateTriggers
create trigger on_post_created_or_updated
    after insert or update on public."Post"
    for each row execute procedure public.insert_hashtag()
;