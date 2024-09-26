import { getLoginUser } from "@/actions/user";
import { UserAvatar } from "@/components/UserAvatar";
import { getPublicUrl } from "@/utils/storage";
import Link from "next/link";

export default async function Page() {
  const me = await getLoginUser();
  return (
    <>
      <UserAvatar
        src={getPublicUrl("User", me.iconPath)}
        className="h-12 w-12"
      />
      <div className="flex flex-col">
        <Link href={`/${me.accountName}`}>最近の投稿</Link>
        <Link href={`/${me.accountName}/spot`}>スポット</Link>
        <Link href={`/${me.accountName}/device`}>デバイス</Link>
      </div>
    </>
  );
}
