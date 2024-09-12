export * from "../../prisma/generated/zod";

import { z } from "zod";
import {
  PostOptionalDefaultsSchema,
  UserOptionalDefaultsSchema,
} from "../../prisma/generated/zod";

export const PostOptionalInputSchema = PostOptionalDefaultsSchema.merge(
  z.object({
    id: z.string().optional(),
    imagePath: z.string().nullish(),
  }),
);
export type PostOptionalInput = z.infer<typeof PostOptionalInputSchema>;

export const UserOptionalInputSchema = UserOptionalDefaultsSchema.merge(
  z.object({
    id: z.string().optional(),
    iconPath: z.string().nullish(),
  }),
);
export type UserOptionalInput = z.infer<typeof UserOptionalInputSchema>;
