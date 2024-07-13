"use server";

import { getLoginUser } from "@/actions/user";
import { UserOptionalDefaults } from "@/types/zod";
import prisma from "@/utils/prisma/client";
import { redirect } from "next/navigation";

export async function updateProfile(data: UserOptionalDefaults) {
  const me = await getLoginUser();

  await prisma.user.update({
    where: {
      id: me.id,
    },
    data: { ...data },
  });

  redirect(`/${me.account_name}`);
}
