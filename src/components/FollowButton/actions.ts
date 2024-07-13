"use server";

import { getLoginUser } from "@/actions/user";
import { FollowOptionalDefaultsSchema } from "@/types/zod";
import prisma from "@/utils/prisma/client";
import { Follow } from "@prisma/client";

export async function updateFollow(
  followUserId: string,
  status: boolean
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
