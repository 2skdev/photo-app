"use server";

import { getAuthUser } from "@/actions/auth";
import { uploadImage } from "@/actions/storage";
import prisma from "@/libs/prisma/client";
import { UserOptionalDefaultsSchema } from "@/models/zod";
import { UserOptionalInput } from "@/models/zodExtension";
import { redirect } from "next/navigation";

export async function addUser(input: UserOptionalInput) {
  const auth = await getAuthUser();

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
