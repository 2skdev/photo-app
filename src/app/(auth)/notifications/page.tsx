import { Header } from "@/components/Header";
import { MdiCog } from "@/components/Icons";
import { APP_NAME } from "@/constants/string";
import Link from "next/link";

export async function generateMetadata() {
  return {
    title: `通知 | ${APP_NAME}`,
  };
}

export default async function Page() {
  return (
    <>
      <Header
        action={
          <Link href="/setting/notifications">
            <MdiCog className="h-6 w-6" />
          </Link>
        }
      >
        通知
      </Header>
    </>
  );
}
