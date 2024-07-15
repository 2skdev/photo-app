import { getLoginUser, getUser } from "@/actions/user";
import FollowButton from "@/components/FollowButton";
import prisma from "@/utils/prisma/client";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

type Props = {
  params: { accountName: string };
};

export default async function Page({ params }: Props) {
  const supabase = createClient();
  const user = await getUser(params.accountName);
  const me = await getLoginUser();

  const isMypage = user.id === me.id;

  const iconUrl = await (async () => {
    console.log(user.icon_path);
    if (user.icon_path) {
      const {
        data: { publicUrl },
      } = await supabase.storage.from("User").getPublicUrl(user.icon_path);

      return publicUrl;
    } else {
      return null;
    }
  })();

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

  return (
    <main>
      <div>{user.account_name}</div>
      <div>{user.display_name}</div>
      {iconUrl && <img src={iconUrl} />}
      {isMypage ? (
        <Link className="btn btn-primary" href="/setting/profile">
          プロフィールを編集
        </Link>
      ) : (
        <FollowButton user={user} default={follow}></FollowButton>
      )}
    </main>
  );
}
