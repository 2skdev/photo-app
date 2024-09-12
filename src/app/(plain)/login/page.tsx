import { Logo } from "@/components/Assets";
import { APP_NAME } from "@/constants/string";
import { SignInWithGoogleButton } from "./components";

export async function generateMetadata() {
  return {
    title: `ログイン | ${APP_NAME}`,
  };
}

export default function Page() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex h-screen w-screen flex-col items-center justify-center p-8 shadow md:h-auto md:w-96 md:rounded md:bg-neutral">
        <Logo className="h-16 w-16" />

        <div className="my-8 text-lg font-bold">ログイン</div>

        <SignInWithGoogleButton />
      </div>
    </div>
  );
}
