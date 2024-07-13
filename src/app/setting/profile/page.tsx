import { getLoginUser } from "@/actions/user";
import { ProfileForm } from "./components";

export default async function Page() {
  const me = await getLoginUser();

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <ProfileForm me={me} />
    </div>
  );
}
