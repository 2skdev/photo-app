"use server";

import { getLoginUser } from "@/actions/user";
import { PostOptionalDefaultsSchema } from "@/types/zod";
import prisma from "@/utils/prisma/client";
import random from "@/utils/random";
import { redirect } from "next/navigation";

export async function upload(form: FormData) {
  const user = await getLoginUser();

  let redirectTo = undefined;

  try {
    const data = PostOptionalDefaultsSchema.parse({
      id: random(10),
      // TODO: id to optional(use auth.uid())
      user_id: user.id,
      caption: form.get("caption"),
      image_url: "http://test.com",
    });

    const { id } = await prisma.post.create({
      data: { ...data },
    });

    redirectTo = `/${user.account_name}/${id}`;
  } catch (e) {
    // TODO: need error handling
    console.log(e);
  }

  if (redirectTo) {
    redirect(redirectTo);
  }
}
