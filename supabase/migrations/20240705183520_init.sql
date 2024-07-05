create table
    public.users (
        id uuid not null,
        account_name varchar(32) not null,
        display_name varchar(32) not null,
        biography text,
        external_url varchar,
        icon_url varchar,
        created_at timestamp default now (),
        updated_at timestamp default now (),
        deleted_at timestamp,
        constraint users_pkey primary key (id),
        constraint users_account_name_key unique (account_name),
        constraint users_id_fkey foreign key (id) references auth.users (id) on delete restrict on update cascade
    );

create table
    public.posts (
        id uuid not null default gen_random_uuid (),
        user_id uuid not null,
        image_url varchar not null,
        created_at timestamp default now (),
        updated_at timestamp default now (),
        deleted_at timestamp,
        constraint posts_pkey primary key (id),
        constraint posts_user_id_fkey foreign key (user_id) references public.users (id) on delete restrict on update cascade
    );