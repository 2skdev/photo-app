import { getFollow, getFollowUsers } from "@/actions/follow";
import { getLoginUser, getUser } from "@/actions/user";
import { UserAvatar } from "@/components/UserAvatar";
import { APP_NAME } from "@/constants/string";
import { getPublicUrl } from "@/utils/storage";
import Link from "next/link";
import { FollowButton } from "../(profile)/components";

type Props = {
  params: { accountName: string };
};

export async function generateMetadata(props: Props) {
  const user = await getUser(props.params.accountName);

  return {
    title: `${user.displayName}(@${user.accountName})さんのフォロー | ${APP_NAME}`,
  };
}

export default async function Page({ params }: Props) {
  const user = await getUser(params.accountName);
  const me = await getLoginUser();

  const follows = (await getFollowUsers(user)).filter(
    (follow) => follow.id !== me.id,
  );

  // TODO: follow button

  return (
    <>
      <div className="mb-8 text-2xl font-bold">フォロー中</div>

      {follows.map(async (follow, index) => (
        <div key={index} className="w-full border-b border-neutral pb-1">
          <div className="flex flex-row items-center">
            <Link
              className="flex cursor-pointer flex-row items-center"
              href={`/${follow.accountName}`}
            >
              <UserAvatar
                src={getPublicUrl("User", follow.iconPath)}
                className="h-10 w-10"
              />

              <div className="ml-2">{follow.displayName}</div>

              <div className="ml-1 text-sm font-light">
                @{follow.accountName}
              </div>
            </Link>

            <FollowButton
              className="btn-sm ml-auto"
              user={follow}
              default={await getFollow(me, follow)}
            />
          </div>

          <div className="mt-1">{follow.biography}</div>
        </div>
      ))}
    </>
  );
}
