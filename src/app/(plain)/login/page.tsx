import { AppLogo, FocusRafiki } from "@/components/Assets";
import { MediaSwitcher } from "@/components/MediaSwitcher";
import { APP_NAME } from "@/constants/string";
import Link from "next/link";
import { SignInWithGoogleButton } from "./components";

export async function generateMetadata() {
  return {
    title: `ログイン | ${APP_NAME}`,
  };
}

export default function Page() {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-base-200">
      <div className="grid h-screen w-screen bg-base-100 shadow-xl md:h-[60%] md:w-[80%] md:grid-cols-2 md:rounded-xl">
        <div className="hidden items-center justify-center rounded-l-xl bg-gradient-to-br from-sky-500 via-blue-500 to-indigo-500 md:flex">
          <FocusRafiki className="h-[32rem] w-[32rem]" />
        </div>

        <div className="flex flex-col items-center justify-center">
          <AppLogo />
          <div className="my-4 text-lg">ログイン</div>
          <SignInWithGoogleButton />
        </div>
      </div>

      <MediaSwitcher
        pc={
          <Link
            href="https://storyset.com/animal"
            target="_blank"
            className="fixed bottom-0 mb-2 text-xs text-base-content/50"
          >
            Animal illustrations by Storyset
          </Link>
        }
      />
    </div>
  );
}
