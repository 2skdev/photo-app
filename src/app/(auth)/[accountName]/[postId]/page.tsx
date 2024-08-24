import { getLike } from "@/actions/like";
import { getPost } from "@/actions/post";
import { getPublicUrl } from "@/actions/storage";
import { getLoginUser } from "@/actions/user";
import CommentForm from "@/components/CommentForm";
import LikeButton from "@/components/LikeButton";

type Props = {
  params: { accountName: string; postId: string };
};

export default async function Page({ params }: Props) {
  const me = await getLoginUser();

  const post = await getPost(params.postId);

  const imageUrl = await getPublicUrl("Post", post.imagePath);

  const like = await getLike(me, post);

  return (
    <main>
      <div>{params.accountName}</div>
      <div>{params.postId}</div>
      <img src={imageUrl!} />

      <LikeButton post={post} default={like}></LikeButton>
      <CommentForm post={post} />
    </main>
  );
}
