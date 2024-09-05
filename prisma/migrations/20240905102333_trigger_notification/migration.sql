-- CreateFunction
create or replace function public.insert_comment_notification()
returns trigger
as $$
begin
    insert into public."Notification"("userId", "eventId", "eventType")
    select
        "Post"."userId" as userId,
        "Comment"."id" as eventId,
        'Comment' as eventType
    from
        public."Comment"
    join
        public."Post" on "Comment"."postId" = "Post"."id"
    where
        "Comment"."id" = new."id" and
        "Comment"."userId" != "Post"."userId"
    ;

    return new;
end;
$$
language plpgsql
security definer set search_path = public
;


create or replace function public.insert_like_notification()
returns trigger
as $$
begin
    insert into public."Notification"("userId", "eventId", "eventType")
    select
        "Post"."userId" as userId,
        "Like"."id" as eventId,
        'Like' as eventType
    from
        public."Like"
    join
        public."Post" on "Like"."postId" = "Post"."id"
    where
        "Like"."id" = new."id" and
        "Like"."userId" != "Post"."userId"
    ;

    return new;
end;
$$
language plpgsql
security definer set search_path = public
;

create or replace function public.insert_follow_notification()
returns trigger
as $$
begin
    insert into public."Notification"("userId", "eventId", "eventType")
    values (new."followUserId", new."id", 'Follow')
    ;

    return new;
end;
$$
language plpgsql
security definer set search_path = public
;

-- CreateTrigger
create trigger on_comment_created
    after insert on public."Comment"
    for each row execute procedure public.insert_comment_notification()
;

create trigger on_like_created
    after insert on public."Like"
    for each row execute procedure public.insert_like_notification()
;

create trigger on_follow_created
    after insert on public."Follow"
    for each row execute procedure public.insert_follow_notification()
;