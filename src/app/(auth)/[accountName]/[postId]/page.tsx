import { getLike } from "@/actions/like";
import { getPost } from "@/actions/post";
import { getPublicUrl } from "@/actions/storage";
import { getLoginUser, getUser } from "@/actions/user";
import { LikeButton } from "@/components/LikeButton";
import { APP_NAME } from "@/constants/string";

type Props = {
  params: { accountName: string; postId: string };
};

export async function generateMetadata(props: Props) {
  const post = await getPost(props.params.postId);
  const user = await getUser(props.params.accountName);

  return {
    title: `${user.displayName}(@${user.accountName})さんの投稿 ${post.caption !== "" ? `| ${post.caption}` : ""} | ${APP_NAME}`,
  };
}

export default async function Page({ params }: Props) {
  const me = await getLoginUser();

  const post = await getPost(params.postId);

  const imageUrl = await getPublicUrl("Post", post.imagePath);

  const like = await getLike(me, post);

  return (
    <div>
      <div>{params.accountName}</div>
      <div>{params.postId}</div>
      <img src={imageUrl!} />

      <LikeButton post={post} default={like}></LikeButton>
    </div>
  );
}
