"use server";

// import { User } from "@/models/zod";
import prisma from "@/libs/prisma/client";
import { createClient } from "@/libs/supabase/server";
import { User } from "@/models/zod";
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
