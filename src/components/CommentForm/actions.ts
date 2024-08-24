"use server";

import { getLoginUser } from "@/actions/user";
import prisma from "@/libs/prisma/client";
import { CommentOptionalDefaultsSchema } from "@/models/zod";

export async function addComment(form: FormData) {
  const me = await getLoginUser();

  try {
    const data = CommentOptionalDefaultsSchema.parse({
      userId: me.id,
      postId: form.get("postId"),
      text: form.get("comment"),
    });

    await prisma.comment.create({ data: { ...data } });
  } catch (e) {
    // TODO: need error handling
    console.log(e);
  }
}
