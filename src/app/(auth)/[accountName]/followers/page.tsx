import { getFollowerUsers } from "@/actions/follow";
import { getPublicUrl } from "@/actions/storage";
import { getLoginUser, getUser } from "@/actions/user";
import UserAvatar from "@/components/UserAvatar";
import Link from "next/link";

type Props = {
  params: { accountName: string };
};

export default async function Page({ params }: Props) {
  const user = await getUser(params.accountName);
  const me = await getLoginUser();

  const followers = await getFollowerUsers(user);

  // TODO: follow button

  return (
    <>
      <div className="mb-8 text-2xl font-bold">フォロワー</div>

      {followers.map(async (follower, index) => (
        <div key={index} className="w-full border-b border-neutral pb-1">
          <div className="flex flex-row items-center">
            <Link
              className="flex flex-row items-center hover:cursor-pointer"
              href={`/${follower.account_name}`}
            >
              <UserAvatar
                src={await getPublicUrl("User", follower.icon_path)}
                className="h-10 w-10"
              />

              <div className="ml-2">{follower.display_name}</div>

              <div className="ml-1 text-sm font-light">
                @{follower.account_name}
              </div>
            </Link>

            <button className="btn btn-neutral btn-sm ml-auto">フォロー</button>
          </div>

          <div className="mt-1">{follower.biography}</div>
        </div>
      ))}
    </>
  );
}
