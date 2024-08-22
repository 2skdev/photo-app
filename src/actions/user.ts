"use server";

// import { User } from "@/models/zod";
import prisma from "@/libs/prisma/client";
import { User } from "@/models/zod";
import { notFound, redirect } from "next/navigation";
import { getAuthUser } from "./auth";

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
  const auth = await getAuthUser();

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
