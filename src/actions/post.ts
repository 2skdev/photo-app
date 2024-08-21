import prisma from "@/utils/prisma/client";
import { Post } from "@prisma/client";
import { notFound } from "next/navigation";

export async function getPost(postId: string): Promise<Post> {
  const post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
  });

  if (!post) {
    notFound();
  }

  return post;
}
