import { APP_NAME } from "@/constants/string";
import { SearchForm } from "./components";

export async function generateMetadata() {
  return {
    title: `検索 | ${APP_NAME}`,
  };
}

export default async function Page() {
  return (
    <>
      <SearchForm />
    </>
  );
}
