"use server";

import prisma from "@/libs/prisma/client";
import { Like, LikeOptionalDefaultsSchema, Post, User } from "@/models/zod";
import { getAuthUser } from "./auth";

export async function getLike(user: User, post: Post): Promise<Like | null> {
  return await prisma.like.findUnique({
    where: {
      user_id_post_id: {
        user_id: user.id,
        post_id: post.id,
      },
    },
  });
}

export async function updateLike(
  postId: string,
  status: boolean,
): Promise<Like> {
  const auth = await getAuthUser();

  const deletedAt = status ? null : new Date();

  const data = LikeOptionalDefaultsSchema.parse({
    user_id: auth.id,
    post_id: postId,
    deleted_at: deletedAt,
  });

  return await prisma.like.upsert({
    where: {
      user_id_post_id: {
        user_id: auth.id,
        post_id: postId,
      },
    },
    create: { ...data },
    update: { deleted_at: data.deleted_at },
  });
}

export async function getLikeCount(post: Post): Promise<number> {
  return await prisma.like.count({
    where: {
      post: post,
    },
  });
}
