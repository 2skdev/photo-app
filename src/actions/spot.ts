"use server";

import prisma from "@/libs/prisma/client";
import { SpotOptionalDefaults, SpotOptionalDefaultsSchema } from "@/types/zod";
import { getAuthUser } from "./auth";

export async function addSpot(input: SpotOptionalDefaults) {
  const auth = await getAuthUser();

  const data = SpotOptionalDefaultsSchema.parse({
    ...input,
    userId: auth.id,
  });

  const spot = await prisma.spot.create({
    data: { ...data },
  });

  return spot;
}
