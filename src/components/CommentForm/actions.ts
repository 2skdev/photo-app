"use server";

import { getLoginUser } from "@/actions/user";
import { CommentOptionalDefaultsSchema } from "@/types/zod";
import prisma from "@/utils/prisma/client";

export async function addComment(form: FormData) {
  const me = await getLoginUser();

  try {
    const data = CommentOptionalDefaultsSchema.parse({
      user_id: me.id,
      post_id: form.get("postId"),
      text: form.get("comment"),
    });

    await prisma.comment.create({ data: { ...data } });
  } catch (e) {
    // TODO: need error handling
    console.log(e);
  }
}
