import { getLike } from "@/actions/like";
import { getLoginUser } from "@/actions/user";
import { LikeButton } from "@/components/LikeButton";
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

  return (
    <main>
      <div>{params.accountName}</div>
      <div>{params.postId}</div>

      <LikeButton
        postId={post.id}
        default={await getLike(params.postId)}
      ></LikeButton>
    </main>
  );
}
