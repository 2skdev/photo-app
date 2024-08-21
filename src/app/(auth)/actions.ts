"use server";

import { getLoginUser } from "@/actions/user";
import { PostOptionalDefaultsSchema } from "@/types/zod";
import { PostOptionalInput } from "@/types/zodExtension";
import prisma from "@/utils/prisma/client";
import random from "@/utils/random";
import { createClient } from "@/utils/supabase/server";
import { uploadImage } from "@/utils/supabase/storage";
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
