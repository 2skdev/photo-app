import { getPublicUrl } from "@/actions/storage";
import { getLoginUser } from "@/actions/user";
import { Header } from "@/components/Header";
import { APP_NAME } from "@/constants/string";
import { ProfileForm } from "./components";

export async function generateMetadata() {
  return {
    title: `プロフィールを編集 | ${APP_NAME}`,
  };
}

export default async function Page() {
  const me = await getLoginUser();

  return (
    <>
      <Header>プロフィールを編集</Header>
      <ProfileForm me={me} iconUrl={await getPublicUrl("User", me.iconPath)} />
    </>
  );
}
