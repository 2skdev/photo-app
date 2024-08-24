"use server";

import prisma from "@/libs/prisma/client";
import {
  Comment,
  CommentOptionalDefaults,
  CommentOptionalDefaultsSchema,
} from "@/models/zod";
import { notFound } from "next/navigation";
import { getAuthUser } from "./auth";

export async function getComment(id: number): Promise<Comment> {
  const comment = await prisma.comment.findUnique({
    where: {
      id: id,
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
