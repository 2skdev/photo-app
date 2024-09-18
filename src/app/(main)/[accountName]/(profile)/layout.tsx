import { getFollow, getFollowCount, getFollowerCount } from "@/actions/follow";
import { getLoginUser, getUser } from "@/actions/user";
import { UserAvatar } from "@/components/UserAvatar";
import { getPublicUrl } from "@/utils/storage";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import { ReactNode } from "react";
import { FollowButton, ProfileNavBar } from "./components";

type Props = {
  children: ReactNode;
  params: { accountName: string };
};

export default async function Layout(props: Props) {
  const user = await getUser(props.params.accountName);
  const me = await getLoginUser();

  const isMypage = user.id === me.id;
  const follow = isMypage ? false : await getFollow(me, user);

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
          <Icon icon="mdi:link" />
          <div>{user.externalUrl}</div>
        </Link>
      )}

      <ProfileNavBar user={user} />

      {props.children}
    </>
  );
}