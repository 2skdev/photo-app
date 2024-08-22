"use server";

import prisma from "@/libs/prisma/client";
import { Follow, FollowOptionalDefaultsSchema, User } from "@/models/zod";
import { getAuthUser } from "./auth";

export async function getFollow(
  user: User,
  followUser: User,
): Promise<Follow | null> {
  return await prisma.follow.findUnique({
    where: {
      user_id_follow_user_id: {
        user_id: user.id,
        follow_user_id: followUser.id,
      },
    },
  });
}

export async function updateFollow(
  followUserId: string,
  status: boolean,
): Promise<Follow> {
  const auth = await getAuthUser();

  const deletedAt = status ? null : new Date();

  const data = FollowOptionalDefaultsSchema.parse({
    user_id: auth.id,
    follow_user_id: followUserId,
    deleted_at: deletedAt,
  });

  return await prisma.follow.upsert({
    where: {
      user_id_follow_user_id: {
        user_id: auth.id,
        follow_user_id: followUserId,
      },
    },
    create: { ...data },
    update: { deleted_at: data.deleted_at },
  });
}

export async function getFollowUsers(
  user: User,
): Promise<Array<Follow & { followUser: User }>> {
  return await prisma.follow.findMany({
    where: {
      user: user,
    },
    include: {
      followUser: true,
    },
  });
}

export async function getFollowerUsers(
  user: User,
): Promise<Array<Follow & { user: User }>> {
  return await prisma.follow.findMany({
    where: {
      followUser: user,
    },
    include: {
      user: true,
    },
  });
}

export async function getFollowCount(user: User): Promise<number> {
  return await prisma.follow.count({
    where: {
      user: user,
    },
  });
}

export async function getFollowerCount(user: User): Promise<number> {
  return await prisma.follow.count({
    where: {
      followUser: user,
    },
  });
}
