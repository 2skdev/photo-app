"use server";

import prisma from "@/libs/prisma/client";
import { SpamOptionalDefaults, SpamOptionalDefaultsSchema } from "@/types/zod";
import { getAuthUser } from "./auth";

export async function addSpam(input: SpamOptionalDefaults) {
  const auth = await getAuthUser();

  const data = SpamOptionalDefaultsSchema.parse({
    ...input,
    userId: auth.id,
  });

  try {
    const spam = await prisma.spam.create({
      data: { ...data },
    });
    return spam;
  } catch (e) {
    console.log(e);
    // todo: use Result type
  }
}
