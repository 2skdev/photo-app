import { getIconURL, getLoginUser } from "@/actions/user";
import { ProfileForm } from "./components";

export default async function Page() {
  const me = await getLoginUser();

  return (
    <>
      <div className="mb-8 text-2xl font-bold">プロフィールを編集</div>
      <ProfileForm me={me} icon_url={await getIconURL(me)} />
    </>
  );
}
