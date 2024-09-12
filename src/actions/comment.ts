"use server";

import prisma from "@/libs/prisma/client";
import {
  Comment,
  CommentOptionalDefaults,
  CommentOptionalDefaultsSchema,
  Post,
  User,
} from "@/types/zod";
import { notFound } from "next/navigation";
import { getAuthUser } from "./auth";

export async function getCommentById(
  id: number,
): Promise<Comment & { user: User; post: Post }> {
  const comment = await prisma.comment.findUnique({
    where: {
      id: id,
    },
    include: {
      user: true,
      post: true,
    },
  });

  if (!comment) {
    notFound();
  }

  return comment;
}

export async function addComment(input: CommentOptionalDefaults) {
  const auth = await getAuthUser();

  const data = CommentOptionalDefaultsSchema.parse({
    ...input,
  });

  return await prisma.comment.create({
    data: { ...data },
  });
}
