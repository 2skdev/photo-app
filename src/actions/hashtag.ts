"use server";

import prisma from "@/libs/prisma/client";
import { Post } from "@/models/zod";

export async function getHashtagPosts(tag: string): Promise<Array<Post>> {
  const hashtags = await prisma.hashtag.findMany({
    where: {
      tag,
    },
    include: {
      post: true,
    },
  });

  return hashtags.map((hashtag) => hashtag.post);
}
