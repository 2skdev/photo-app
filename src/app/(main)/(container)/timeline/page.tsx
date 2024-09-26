import { getTimelinePosts } from "./actions";
import { Timeline } from "./components";

export default async function Page() {
  const posts = await getTimelinePosts();

  return (
    <>
      <Timeline default={posts} />
    </>
  );
}
