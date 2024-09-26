import { getPosts } from "@/actions/post";
import { getLoginUser, getUser } from "@/actions/user";
import { APP_NAME } from "@/constants/string";
import { PostGridItem } from "./components";

type Props = {
  params: { accountName: string };
};

export async function generateMetadata(props: Props) {
  const user = await getUser(props.params.accountName);

  return {
    title: `${user.displayName}(@${user.accountName}) | ${APP_NAME}`,
  };
}

export default async function Page(props: Props) {
  const user = props.params.accountName
    ? await getUser(props.params.accountName)
    : await getLoginUser();

  // todo: unknownを判定

  // todo: load next
  const posts = await getPosts(user);

  return (
    <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
      {posts.map(async (post) => (
        <PostGridItem key={post.id} post={post} user={user} />
      ))}
    </div>
  );
}
