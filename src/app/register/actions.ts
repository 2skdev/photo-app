"use server";

import { UserOptionalDefaultsSchema } from "@/types/zod";
import prisma from "@/utils/prisma/client";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function register(form: FormData) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  let redirectTo = undefined;

  try {
    const data = UserOptionalDefaultsSchema.parse({
      // TODO: id to optional(use auth.uid())
      id: user.id,
      account_name: form.get("account_name") as string,
      display_name: form.get("display_name") as string,
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
