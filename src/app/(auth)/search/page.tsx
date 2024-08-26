import { Header } from "@/components/Header";

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
