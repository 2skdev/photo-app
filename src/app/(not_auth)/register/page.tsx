import { Logo } from "@/components/Assets";
import { APP_NAME } from "@/constants/string";
import { RegisterForm } from "./components";

export async function generateMetadata() {
  return {
    title: `アカウントを登録 | ${APP_NAME}`,
  };
}

export default function Page() {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-start p-8 shadow md:h-auto md:w-96 md:rounded md:bg-neutral">
      <Logo className="h-16 w-16" />

      <div className="my-8 text-2xl font-bold">アカウントを登録</div>

      <RegisterForm />
    </div>
  );
}
