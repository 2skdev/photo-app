import { getLike } from "@/actions/like";
import { getPost } from "@/actions/post";
import { getLoginUser, getUser } from "@/actions/user";
import { LikeButton } from "@/components/LikeButton";
import { Map } from "@/components/Map";
import { APP_NAME } from "@/constants/string";
import { getPublicUrl } from "@/utils/storage";

type Props = {
  params: { accountName: string; postId: string };
};

export async function generateMetadata(props: Props) {
  const post = await getPost(props.params.postId);
  const user = await getUser(props.params.accountName);

  return {
    title: `${user.displayName}(@${user.accountName})さんの投稿 ${post.text !== "" ? `| ${post.text}` : ""} | ${APP_NAME}`,
    description: post.text,
    openGraph: {
      images: [getPublicUrl("Post", post.imagePath)],
    },
  };
}

export default async function Page({ params }: Props) {
  const me = await getLoginUser();
  const post = await getPost(params.postId);
  const like = await getLike(me, post);

  return (
    <div>
      <div>{params.accountName}</div>
      <div>{params.postId}</div>
      <img src={getPublicUrl("Post", post.imagePath)!} />

      <LikeButton post={post} default={like}></LikeButton>

      <Map
        center={[35.6811673, 139.7670516]}
        marker={[35.6811673, 139.7670516]}
      />
    </div>
  );
}
