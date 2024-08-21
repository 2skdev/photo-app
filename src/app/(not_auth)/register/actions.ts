"use server";

import { UserOptionalDefaultsSchema } from "@/types/zod";
import { UserOptionalInput } from "@/types/zodExtension";
import prisma from "@/utils/prisma/client";
import { createClient } from "@/utils/supabase/server";
import { uploadImage } from "@/utils/supabase/storage";
import { redirect } from "next/navigation";

export async function addUser(input: UserOptionalInput) {
  const supabase = createClient();

  const {
    data: { user: auth },
  } = await supabase.auth.getUser();

  if (!auth) {
    redirect("/login");
  }

  let redirectTo = undefined;

  try {
    let path = undefined;

    if (input.icon_src) {
      path = await uploadImage(input.icon_src, "User", {
        path: `${auth.id}`,
        upsert: true,
      });
    }

    const data = UserOptionalDefaultsSchema.parse({
      ...input,
      // TODO: id to optional(use auth.uid())
      id: auth.id,
      icon_path: path,
    });

    const { account_name } = await prisma.user.create({
      data: { ...data },
    });

    redirectTo = `/${account_name}`;
  } catch (e) {
    // TODO: need error handling
    console.log(e);
  }

  if (redirectTo) {
    redirect(redirectTo);
  }
}
