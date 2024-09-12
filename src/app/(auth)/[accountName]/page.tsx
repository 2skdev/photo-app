import { getFollow, getFollowCount, getFollowerCount } from "@/actions/follow";
import { getPosts } from "@/actions/post";
import { getLoginUser, getUser } from "@/actions/user";
import { MdiLink } from "@/components/Icons";
import { UserAvatar } from "@/components/UserAvatar";
import { APP_NAME } from "@/constants/string";
import { getPublicUrl } from "@/utils/storage";
import Link from "next/link";
import { FollowButton, PostGridItem } from "./components";

type Props = {
  params: { accountName: string };
};

export async function generateMetadata(props: Props) {
  const user = await getUser(props.params.accountName);

  return {
    title: `${user.displayName}(@${user.accountName}) | ${APP_NAME}`,
  };
}

export default async function Page({ params }: Props) {
  const user = await getUser(params.accountName);
  const me = await getLoginUser();

  const isMypage = user.id === me.id;

  const follow = isMypage ? false : await getFollow(me, user);

  // todo: load next
  const posts = await getPosts(user);

  // TODO: icon image cached and change not applied

  return (
    <>
      <UserAvatar
        src={getPublicUrl("User", user.iconPath)}
        className="h-24 w-24"
      />
      <div className="mt-4 flex w-full items-center">
        <div>
          <div className="text-lg md:text-2xl">{user.displayName}</div>
          <div className="font-light">@{user.accountName}</div>
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
            <FollowButton
              className="btn-sm md:btn-md"
              user={user}
              default={follow}
            ></FollowButton>
          )}
        </div>
      </div>

      <div className="mt-4 flex space-x-4">
        <Link
          className="rounded-full text-xs font-light hover:underline"
          href={`/${user.accountName}/follows`}
        >
          <span className="font-bold">{await getFollowCount(user)}</span>
          &nbsp;フォロー
        </Link>
        <Link
          className="rounded-full text-xs font-light hover:underline"
          href={`/${user.accountName}/followers`}
        >
          <span className="font-bold">{await getFollowerCount(user)}</span>
          &nbsp;フォロワー
        </Link>
      </div>

      <div className="mt-4 whitespace-pre-wrap">{user.biography}</div>

      {user.externalUrl && (
        <Link
          className="link-primary mt-2 flex items-center space-x-1 font-light"
          href={user.externalUrl}
          target="_blank"
        >
          <MdiLink />
          <div>{user.externalUrl}</div>
        </Link>
      )}

      <div className="my-4 w-full border-t border-neutral" />

      <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
        {posts.map(async (post) => (
          <PostGridItem key={post.id} post={post} user={user} />
        ))}
      </div>
    </>
  );
}
