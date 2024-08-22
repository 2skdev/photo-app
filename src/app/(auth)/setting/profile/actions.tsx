"use server";

import { uploadImage } from "@/actions/storage";
import { getLoginUser } from "@/actions/user";
import prisma from "@/libs/prisma/client";
import { UserOptionalDefaultsSchema } from "@/models/zod";
import { UserOptionalInput } from "@/models/zodExtension";
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
