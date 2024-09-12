import { getLoginUser } from "@/actions/user";
import { Header } from "@/components/Header";
import { MdiCog } from "@/components/Icons";
import Link from "next/link";
import { getTimelinePosts } from "./actions";
import { Timeline } from "./components";

export default async function Page() {
  const me = await getLoginUser();

  // todo: load next
  const posts = await getTimelinePosts();

  return (
    <>
      <Header
        spOnly
        action={
          <Link href="/setting">
            <MdiCog className="h-6 w-6" />
          </Link>
        }
      >
        ホーム
      </Header>

      <Timeline default={posts} />
    </>
  );
}
