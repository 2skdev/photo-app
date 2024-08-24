import { getPublicUrl } from "@/actions/storage";
import { getLoginUser } from "@/actions/user";
import { Header } from "@/components/Header";
import { ProfileForm } from "./components";

export default async function Page() {
  const me = await getLoginUser();

  return (
    <>
      <Header>プロフィールを編集</Header>
      <ProfileForm me={me} iconUrl={await getPublicUrl("User", me.iconPath)} />
    </>
  );
}
