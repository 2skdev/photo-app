"use server";

// import { User } from "@/types/zod";
import prisma from "@/libs/prisma/client";
import {
  User,
  UserOptionalDefaultsSchema,
  UserOptionalInput,
} from "@/types/zod";
import { notFound, redirect } from "next/navigation";
import { getAuthUser } from "./auth";
import { uploadImage } from "./storage";

export async function getUser(accountName: string): Promise<User> {
  const user = await prisma.user.findFirst({
    where: {
      accountName,
    },
  });

  if (!user) {
    notFound();
  }

  return user;
}

export async function getUserById(id: string): Promise<User> {
  const user = await prisma.user.findUnique({
    where: {
      id,
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

export async function upsertUser(input: UserOptionalInput, image?: string) {
  const auth = await getAuthUser();

  if (!auth) {
    redirect("/login");
  }

  let redirectTo = undefined;

  try {
    let path = undefined;

    if (image) {
      path = await uploadImage("User", image, {
        path: `${auth.id}`,
        upsert: true,
      });
    }

    const data = UserOptionalDefaultsSchema.parse({
      ...input,
      id: auth.id,
      iconPath: path,
    });

    const { accountName } = await prisma.user.upsert({
      where: {
        id: auth.id,
      },
      create: { ...data },
      update: { ...data },
    });

    redirectTo = `/${accountName}`;
  } catch (e) {
    // TODO: need error handling
    console.log(e);
  }

  if (redirectTo) {
    redirect(redirectTo);
  }
}
