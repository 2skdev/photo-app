"use server";

// import { User } from "@/types/zod";
import prisma from "@/utils/prisma/client";
import { createClient } from "@/utils/supabase/server";
import { User } from "@prisma/client";
import { notFound, redirect } from "next/navigation";

export async function getUser(account_name: string): Promise<User> {
  const user = await prisma.user.findFirst({
    where: {
      account_name,
    },
  });

  if (!user) {
    notFound();
  }

  return user;
}

export async function getLoginUser(): Promise<User> {
  const supabase = createClient();

  const {
    data: { user: auth },
  } = await supabase.auth.getUser();

  if (!auth) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: {
      id: auth.id,
    },
  });

  if (!user) {
    redirect("/register");
  }

  return user;
}

export async function getIconURL(user: User): Promise<string | null> {
  const supabase = createClient();

  if (user.icon_path) {
    const {
      data: { publicUrl },
    } = await supabase.storage.from("User").getPublicUrl(user.icon_path);

    return publicUrl;
  } else {
    return null;
  }
}
