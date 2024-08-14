import { getLoginUser } from "@/actions/user";
import CommentForm from "@/components/CommentForm";
import LikeButton from "@/components/LikeButton";
import prisma from "@/utils/prisma/client";
import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";

type Props = {
  params: { accountName: string; postId: string };
};

export default async function Page({ params }: Props) {
  const supabase = createClient();
  const me = await getLoginUser();

  const post = await prisma.post.findUnique({
    where: {
      id: params.postId,
    },
  });
  if (!post) {
    notFound();
  }
  const {
    data: { publicUrl: imageUrl },
  } = await supabase.storage.from("Post").getPublicUrl(post.image_path);

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
      <img src={imageUrl} />

      <LikeButton post={post} default={like}></LikeButton>
      <CommentForm post={post} />
    </main>
  );
}
