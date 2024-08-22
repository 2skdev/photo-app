"use server";

import prisma from "@/libs/prisma/client";
import { Like, LikeOptionalDefaultsSchema, Post, User } from "@/models/zod";
import { getAuthUser } from "./auth";

export async function getLike(user: User, post: Post): Promise<boolean> {
  const like = await prisma.like.findUnique({
    where: {
      user_id_post_id: {
        user_id: user.id,
        post_id: post.id,
      },
    },
  });

  if (!like || like.deleted_at) {
    return false;
  } else {
    return true;
  }
}

export async function updateLike(post: Post, status: boolean): Promise<Like> {
  const auth = await getAuthUser();

  const deletedAt = status ? null : new Date();

  const data = LikeOptionalDefaultsSchema.parse({
    user_id: auth.id,
    post_id: post.id,
    deleted_at: deletedAt,
  });

  return await prisma.like.upsert({
    where: {
      user_id_post_id: {
        user_id: auth.id,
        post_id: post.id,
      },
    },
    create: { ...data },
    update: { deleted_at: data.deleted_at },
  });
}

export async function getLikeUsers(post: Post): Promise<Array<User>> {
  const likes = await prisma.like.findMany({
    where: {
      post: post,
      deleted_at: null,
    },
    include: {
      user: true,
    },
  });

  return likes.map((like) => like.user);
}

export async function getLikePosts(user: User): Promise<Array<Post>> {
  const likes = await prisma.like.findMany({
    where: {
      user: user,
      deleted_at: null,
    },
    include: {
      post: true,
    },
  });

  return likes.map((like) => like.post);
}

export async function getLikeUserCount(post: Post): Promise<number> {
  return await prisma.like.count({
    where: {
      post: post,
      deleted_at: null,
    },
  });
}

export async function getLikePostCount(user: User): Promise<number> {
  return await prisma.like.count({
    where: {
      user: user,
      deleted_at: null,
    },
  });
}
