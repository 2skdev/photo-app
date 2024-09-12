"use server";

import prisma from "@/libs/prisma/client";
import { Like, LikeOptionalDefaultsSchema, Post, User } from "@/types/zod";
import { notFound } from "next/navigation";
import { getAuthUser } from "./auth";

export async function getLike(user: User, post: Post): Promise<boolean> {
  const like = await prisma.like.findUnique({
    where: {
      userId_postId: {
        userId: user.id,
        postId: post.id,
      },
    },
  });

  if (!like || like.deletedAt) {
    return false;
  } else {
    return true;
  }
}

export async function getLikeById(
  id: number,
): Promise<Like & { user: User; post: Post }> {
  const like = await prisma.like.findUnique({
    where: {
      id: id,
    },
    include: {
      user: true,
      post: true,
    },
  });

  if (!like) {
    notFound();
  }

  return like;
}

export async function addLike(post: Post) {
  const auth = await getAuthUser();

  const data = LikeOptionalDefaultsSchema.parse({
    userId: auth.id,
    postId: post.id,
    deletedAt: null,
  });

  return await prisma.like.upsert({
    where: {
      userId_postId: {
        userId: data.userId,
        postId: data.postId,
      },
    },
    create: { ...data },
    update: { deletedAt: data.deletedAt },
  });
}

export async function deleteLike(post: Post) {
  const auth = await getAuthUser();

  await prisma.like.update({
    where: {
      userId_postId: {
        userId: auth.id,
        postId: post.id,
      },
    },
    data: {
      deletedAt: new Date(),
    },
  });
}

export async function updateLike(post: Post, status: boolean): Promise<Like> {
  const auth = await getAuthUser();

  const deletedAt = status ? null : new Date();

  const data = LikeOptionalDefaultsSchema.parse({
    userId: auth.id,
    postId: post.id,
    deletedAt: deletedAt,
  });

  return await prisma.like.upsert({
    where: {
      userId_postId: {
        userId: data.userId,
        postId: data.postId,
      },
    },
    create: { ...data },
    update: { deletedAt: data.deletedAt },
  });
}

export async function getLikeUsers(post: Post): Promise<Array<User>> {
  const likes = await prisma.like.findMany({
    where: {
      post: post,
      deletedAt: null,
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
      deletedAt: null,
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
      deletedAt: null,
    },
  });
}

export async function getLikePostCount(user: User): Promise<number> {
  return await prisma.like.count({
    where: {
      user: user,
      deletedAt: null,
    },
  });
}
