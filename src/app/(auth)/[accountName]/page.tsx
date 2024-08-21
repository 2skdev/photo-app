import { getLoginUser, getUser } from "@/actions/user";
import { MaterialSymbolsAttachFile } from "@/components/icons";
import UserAvatar from "@/components/UserAvatar";
import prisma from "@/utils/prisma/client";
import { getPublicUrl } from "@/utils/supabase/storage";
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

      <div className="mt-4 w-full border-t border-neutral"></div>
    </>
  );
}
