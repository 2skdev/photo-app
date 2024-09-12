import { Header } from "@/components/Header";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { getTimelinePosts } from "./actions";
import { Timeline } from "./components";

export default async function Page() {
  // todo: load next
  const posts = await getTimelinePosts();

  return (
    <>
      <Header
        spOnly
        action={
          <Link href="/setting">
            <Icon className="h-6 w-6" icon="mdi:cog" />
          </Link>
        }
      >
        ホーム
      </Header>

      <Timeline default={posts} />
    </>
  );
}
