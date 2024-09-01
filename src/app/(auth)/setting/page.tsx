import { Header } from "@/components/Header";
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
      <Header>設定</Header>

      <div className="mb-2 text-lg">テーマ</div>
      <ThemePicker />
    </>
  );
}
