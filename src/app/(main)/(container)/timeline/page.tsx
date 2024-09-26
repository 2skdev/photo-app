import { APP_NAME } from "@/constants/string";
import { getTimelinePosts } from "./actions";
import { Timeline } from "./components";

export async function generateMetadata() {
  return {
    title: `タイムライン | ${APP_NAME}`,
  };
}

export default async function Page() {
  const posts = await getTimelinePosts();

  return (
    <>
      <Timeline default={posts} />
    </>
  );
}
