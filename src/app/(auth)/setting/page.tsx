import { Header } from "@/components/Header";
import { ThemePicker } from "./components";

export default async function Page() {
  return (
    <>
      <Header>設定</Header>

      <div className="mb-2 text-lg">テーマ</div>
      <ThemePicker />
    </>
  );
}
