import { z } from "zod";
import { PostOptionalDefaultsSchema, UserOptionalDefaultsSchema } from "../zod";

export const PostOptionalInputSchema = PostOptionalDefaultsSchema.merge(
  z.object({
    id: z.string().optional(),
    imagePath: z.string().nullish().optional(),
    imageSrc: z.string(),
  }),
);
export type PostOptionalInput = z.infer<typeof PostOptionalInputSchema>;

export const UserOptionalInputSchema = UserOptionalDefaultsSchema.merge(
  z.object({
    iconPath: z.string().nullish().optional(),
    iconSrc: z.string().optional(),
  }),
);
export type UserOptionalInput = z.infer<typeof UserOptionalInputSchema>;
