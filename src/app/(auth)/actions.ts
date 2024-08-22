"use server";

import { uploadImage } from "@/actions/storage";
import { getLoginUser } from "@/actions/user";
import prisma from "@/libs/prisma/client";
import { createClient } from "@/libs/supabase/server";
import { PostOptionalDefaultsSchema } from "@/models/zod";
import { PostOptionalInput } from "@/models/zodExtension";
import random from "@/utils/random";
import { redirect } from "next/navigation";

export async function signOut() {
  const supabase = createClient();

  await supabase.auth.signOut();

  redirect("/login");
}

export async function addPost(input: PostOptionalInput) {
  const me = await getLoginUser();

  let redirectTo = undefined;

  try {
    const path = await uploadImage(input.image_src, "Post");

    const data = PostOptionalDefaultsSchema.parse({
      ...input,
      id: random(10),
      user_id: me.id,
      image_path: path,
    });

    const { id } = await prisma.post.create({
      data: { ...data },
    });

    redirectTo = `/${me.account_name}/${id}`;
  } catch (e) {
    // TODO: need error handling
    console.log(e);
  }

  if (redirectTo) {
    redirect(redirectTo);
  }
}
