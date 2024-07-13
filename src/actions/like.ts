"use server";

import { getLoginUser } from "@/actions/user";
import { LikeOptionalDefaultsSchema } from "@/types/zod";
import prisma from "@/utils/prisma/client";
import { Like } from "@prisma/client";

export async function getLike(postId: string): Promise<Like | null> {
  const me = await getLoginUser();

  return await prisma.like.findUnique({
    where: {
      user_id_post_id: {
        user_id: me.id,
        post_id: postId,
      },
    },
  });
}

export async function addLike(postId: string): Promise<Like> {
  const me = await getLoginUser();

  const data = LikeOptionalDefaultsSchema.parse({
    post_id: postId,
    user_id: me.id,
    deleted_at: null,
  });

  return await prisma.like.upsert({
    where: {
      user_id_post_id: {
        user_id: me.id,
        post_id: postId,
      },
    },
    create: { ...data },
    update: { deleted_at: data.deleted_at },
  });
}

export async function deleteLike(postId: string): Promise<Like> {
  const me = await getLoginUser();

  const data = LikeOptionalDefaultsSchema.parse({
    post_id: postId,
    user_id: me.id,
    deleted_at: new Date(),
  });

  return await prisma.like.upsert({
    where: {
      user_id_post_id: {
        user_id: me.id,
        post_id: postId,
      },
    },
    create: { ...data },
    update: { deleted_at: data.deleted_at },
  });
}
