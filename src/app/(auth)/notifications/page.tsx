import { Header } from "@/components/Header";
import { MdiCog } from "@/components/Icons";
import Link from "next/link";

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
