"use server";

import prisma from "@/libs/prisma/client";
import { Follow, FollowOptionalDefaultsSchema, User } from "@/models/zod";
import { notFound } from "next/navigation";
import { getAuthUser } from "./auth";

export async function getFollow(
  user: User,
  followUser: User,
): Promise<boolean> {
  const follow = await prisma.follow.findUnique({
    where: {
      userId_followUserId: {
        userId: user.id,
        followUserId: followUser.id,
      },
    },
  });

  if (!follow || follow.deletedAt) {
    return false;
  } else {
    return true;
  }
}

export async function getFollowById(id: number): Promise<
  Follow & {
    user: User;
    followUser: User;
  }
> {
  const follow = await prisma.follow.findUnique({
    where: {
      id: id,
    },
    include: {
      user: true,
      followUser: true,
    },
  });

  if (!follow) {
    notFound();
  }

  return follow;
}

export async function updateFollow(
  user: User,
  status: boolean,
): Promise<Follow> {
  const auth = await getAuthUser();

  const deletedAt = status ? null : new Date();

  const data = FollowOptionalDefaultsSchema.parse({
    userId: auth.id,
    followUserId: user.id,
    deletedAt: deletedAt,
  });

  return await prisma.follow.upsert({
    where: {
      userId_followUserId: {
        userId: data.userId,
        followUserId: data.followUserId,
      },
    },
    create: { ...data },
    update: { deletedAt: data.deletedAt },
  });
}

export async function getFollowUsers(user: User): Promise<Array<User>> {
  const follows = await prisma.follow.findMany({
    where: {
      user: user,
      deletedAt: null,
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
      deletedAt: null,
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
      deletedAt: null,
    },
  });
}

export async function getFollowerCount(user: User): Promise<number> {
  return await prisma.follow.count({
    where: {
      followUser: user,
      deletedAt: null,
    },
  });
}
