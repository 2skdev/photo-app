import { getPost } from "@/actions/post";
import { getPublicUrl } from "@/actions/storage";
import { getLoginUser } from "@/actions/user";
import CommentForm from "@/components/CommentForm";
import LikeButton from "@/components/LikeButton";
import prisma from "@/libs/prisma/client";

type Props = {
  params: { accountName: string; postId: string };
};

export default async function Page({ params }: Props) {
  const me = await getLoginUser();

  const post = await getPost(params.postId);

  const imageUrl = await getPublicUrl("Post", post.image_path);

  const like = await prisma.like.findUnique({
    where: {
      user_id_post_id: {
        user_id: me.id,
        post_id: post.id,
      },
    },
  });

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
