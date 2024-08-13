import { getLoginUser } from "@/actions/user";
import { ProfileForm } from "./components";

export default async function Page() {
  const me = await getLoginUser();

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <ProfileForm me={me} />
    </div>
  );
}
