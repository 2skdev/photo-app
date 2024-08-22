import { getPublicUrl } from "@/actions/storage";
import { getLoginUser, getUser } from "@/actions/user";
import { MaterialSymbolsAttachFile } from "@/components/icons";
import { PostGridItem } from "@/components/PostItem";
import UserAvatar from "@/components/UserAvatar";
import prisma from "@/libs/prisma/client";
import Link from "next/link";
import { FollowButton } from "./components";

type Props = {
  params: { accountName: string };
};

export default async function Page({ params }: Props) {
  const user = await getUser(params.accountName);
  const me = await getLoginUser();

  const isMypage = user.id === me.id;

  const follow = isMypage
    ? null
    : await prisma.follow.findUnique({
        where: {
          user_id_follow_user_id: {
            user_id: me.id,
            follow_user_id: user.id,
          },
        },
      });

  // todo: load next
  const posts = await prisma.post.findMany({
    where: {
      user,
    },
    take: 10,
    skip: 0,
    orderBy: {
      created_at: "desc",
    },
  });

  const followCount = await prisma.follow.count({
    where: {
      user: user,
    },
  });
  const followerCount = await prisma.follow.count({
    where: {
      followUser: user,
    },
  });

  // TODO: icon image cached and change not applied

  return (
    <>
      <UserAvatar
        src={await getPublicUrl("User", user.icon_path)}
        className="h-24 w-24"
      />
      <div className="mt-4 flex w-full items-center">
        <div>
          <div className="text-lg md:text-2xl">{user.display_name}</div>
          <div className="font-light">@{user.account_name}</div>
        </div>

        <div className="ml-auto">
          {isMypage ? (
            <Link
              className="btn btn-primary btn-sm md:btn-md"
              href="/setting/profile"
            >
              プロフィールを編集
            </Link>
          ) : (
            <FollowButton user={user} default={follow}></FollowButton>
          )}
        </div>
      </div>

      <div className="mt-4 flex space-x-4">
        <Link
          className="rounded-full text-xs font-light hover:underline"
          href={`/${user.account_name}/follows`}
        >
          <span className="font-bold">{followCount}</span>
          &nbsp;フォロー
        </Link>
        <Link
          className="rounded-full text-xs font-light hover:underline"
          href={`/${user.account_name}/followers`}
        >
          <span className="font-bold">{followerCount}</span>
          &nbsp;フォロワー
        </Link>
      </div>

      <div className="mt-4">{user.biography}</div>

      {user.external_url && (
        <Link
          className="link-primary mt-2 flex items-center space-x-1 font-light"
          href={user.external_url}
        >
          <MaterialSymbolsAttachFile />
          <div>{user.external_url}</div>
        </Link>
      )}

      <div className="my-4 w-full border-t border-neutral" />

      <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
        {posts.map(async (post) => (
          <PostGridItem
            key={post.id}
            post={post}
            postImageSrc={await getPublicUrl("Post", post.image_path)}
            user={me}
            userIconSrc={await getPublicUrl("User", user.icon_path)}
          />
        ))}
      </div>
    </>
  );
}
