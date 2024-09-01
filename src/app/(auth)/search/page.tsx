import { Header } from "@/components/Header";
import { APP_NAME } from "@/constants/string";

export async function generateMetadata() {
  return {
    title: `検索 | ${APP_NAME}`,
  };
}

export default async function Page() {
  return (
    <>
      <Header>
        <input
          type="text"
          placeholder="検索"
          className="input input-sm w-full rounded-full bg-neutral"
        />
      </Header>
    </>
  );
}
