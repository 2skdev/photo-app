"use server";

import prisma from "@/libs/prisma/client";
import { Follow, FollowOptionalDefaultsSchema, User } from "@/models/zod";
import { getAuthUser } from "./auth";

export async function getFollow(
  user: User,
  followUser: User,
): Promise<boolean> {
  const follow = await prisma.follow.findUnique({
    where: {
      user_id_follow_user_id: {
        user_id: user.id,
        follow_user_id: followUser.id,
      },
    },
  });

  if (!follow || follow.deleted_at) {
    return false;
  } else {
    return true;
  }
}

export async function updateFollow(
  user: User,
  status: boolean,
): Promise<Follow> {
  const auth = await getAuthUser();

  const deletedAt = status ? null : new Date();

  const data = FollowOptionalDefaultsSchema.parse({
    user_id: auth.id,
    follow_user_id: user.id,
    deleted_at: deletedAt,
  });

  return await prisma.follow.upsert({
    where: {
      user_id_follow_user_id: {
        user_id: auth.id,
        follow_user_id: user.id,
      },
    },
    create: { ...data },
    update: { deleted_at: data.deleted_at },
  });
}

export async function getFollowUsers(user: User): Promise<Array<User>> {
  const follows = await prisma.follow.findMany({
    where: {
      user: user,
      deleted_at: null,
    },
    include: {
      followUser: true,
    },
  });

  return follows.map((follow) => follow.followUser);
}

export async function getFollowerUsers(user: User): Promise<Array<User>> {
  const followers = await prisma.follow.findMany({
    where: {
      followUser: user,
      deleted_at: null,
    },
    include: {
      user: true,
    },
  });

  return followers.map((follower) => follower.user);
}

export async function getFollowCount(user: User): Promise<number> {
  return await prisma.follow.count({
    where: {
      user: user,
      deleted_at: null,
    },
  });
}

export async function getFollowerCount(user: User): Promise<number> {
  return await prisma.follow.count({
    where: {
      followUser: user,
      deleted_at: null,
    },
  });
}
