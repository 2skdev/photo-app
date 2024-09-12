import { APP_NAME } from "@/constants/string";
import { ThemePicker } from "./components";

export async function generateMetadata() {
  return {
    title: `設定 | ${APP_NAME}`,
  };
}

export default async function Page() {
  return (
    <>
      <ThemePicker />
    </>
  );
}
