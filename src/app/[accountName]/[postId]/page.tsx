import { getLoginUser } from "@/actions/user";
import CommentForm from "@/components/CommentForm";
import LikeButton from "@/components/LikeButton";
import prisma from "@/utils/prisma/client";
import { notFound } from "next/navigation";

type Props = {
  params: { accountName: string; postId: string };
};

export default async function Page({ params }: Props) {
  const me = await getLoginUser();

  const post = await prisma.post.findUnique({
    where: {
      id: params.postId,
    },
  });
  if (!post) {
    notFound();
  }

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

      <LikeButton post={post} default={like}></LikeButton>

      <CommentForm post={post} />
    </main>
  );
}
