"use server";

import { getLoginUser } from "@/actions/user";
import prisma from "@/libs/prisma/client";
import { Follow, Like, Post, User } from "@/types/zod";

export type TimelinePost = {
  post: Post;
  user: User;
  me: User;
  like: Like | null;
  follow: Follow | null;
  count: {
    like: number;
    comment: number;
  };
};

export async function getTimelinePosts(skip = 0): Promise<Array<TimelinePost>> {
  const me = await getLoginUser();

  const posts: Array<Post & { user: User }> = await prisma.post.findMany({
    where: {
      deletedAt: null,
    },
    take: 10,
    skip: skip,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      user: true,
    },
  });

  return await Promise.all(
    posts.map(async (post) => ({
      post,
      user: post.user,
      me,
      like: await prisma.like.findUnique({
        where: {
          userId_postId: {
            userId: me.id,
            postId: post.id,
          },
          deletedAt: null,
        },
      }),
      follow: await prisma.follow.findUnique({
        where: {
          userId_followUserId: {
            userId: me.id,
            followUserId: post.userId,
          },
          deletedAt: null,
        },
      }),
      count: {
        like: await prisma.like.count({
          where: {
            post,
            deletedAt: null,
          },
        }),
        comment: await prisma.comment.count({
          where: {
            post,
            deletedAt: null,
          },
        }),
      },
    })),
  );
}
