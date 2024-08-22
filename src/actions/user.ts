"use server";

// import { User } from "@/models/zod";
import prisma from "@/libs/prisma/client";
import { User, UserOptionalDefaultsSchema } from "@/models/zod";
import { UserOptionalInput } from "@/models/zodExtension";
import { notFound, redirect } from "next/navigation";
import { getAuthUser } from "./auth";
import { uploadImage } from "./storage";

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

export async function updateUser(input: UserOptionalInput) {
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

    const { account_name } = await prisma.user.update({
      where: {
        id: auth.id,
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
