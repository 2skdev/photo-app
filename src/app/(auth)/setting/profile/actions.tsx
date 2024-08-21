"use server";

import { getLoginUser } from "@/actions/user";
import { UserOptionalDefaultsSchema } from "@/types/zod";
import { UserOptionalInput } from "@/types/zodExtension";
import prisma from "@/utils/prisma/client";
import { uploadImage } from "@/utils/supabase/storage";
import { redirect } from "next/navigation";

export async function updateProfile(input: UserOptionalInput) {
  const me = await getLoginUser();

  let redirectTo = undefined;

  try {
    let path = undefined;

    if (input.icon_src) {
      path = await uploadImage(input.icon_src, "User", {
        path: `${me.id}`,
        upsert: true,
      });
    }

    const data = UserOptionalDefaultsSchema.parse({
      ...input,
      // TODO: id to optional(use auth.uid())
      id: me.id,
      icon_path: path,
    });

    const { account_name } = await prisma.user.update({
      where: {
        id: me.id,
      },
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
