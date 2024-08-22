"use server";

import { getLoginUser } from "@/actions/user";
import prisma from "@/libs/prisma/client";
import { Follow, FollowOptionalDefaultsSchema, User } from "@/models/zod";

export async function updateFollow(
  followUserId: string,
  status: boolean,
): Promise<Follow> {
  const me = await getLoginUser();

  const deletedAt = status ? null : new Date();

  const data = FollowOptionalDefaultsSchema.parse({
    user_id: me.id,
    follow_user_id: followUserId,
    deleted_at: deletedAt,
  });

  return await prisma.follow.upsert({
    where: {
      user_id_follow_user_id: {
        user_id: me.id,
        follow_user_id: followUserId,
      },
    },
    create: { ...data },
    update: { deleted_at: data.deleted_at },
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
