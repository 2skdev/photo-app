import Image from "next/image";
import { SignInWithGoogleButton } from "./components";

export default function Page() {
  return (
    <div className="flex w-96 flex-col items-center rounded bg-neutral p-8 shadow">
      <div className="flex items-center justify-start">
        <Image src="/icon.svg" alt="Icon" width={24} height={24} />
        <div className="ml-2">Photo App</div>
      </div>

      <div className="my-8 text-lg font-bold">ログイン</div>

      <SignInWithGoogleButton />
    </div>
  );
}
