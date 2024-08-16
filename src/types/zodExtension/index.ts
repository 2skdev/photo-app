import { z } from "zod";
import { PostOptionalDefaultsSchema, UserOptionalDefaultsSchema } from "../zod";

export const PostOptionalInputSchema = PostOptionalDefaultsSchema.merge(
  z.object({
    id: z.string().optional(),
    image_path: z.string().nullish().optional(),
    image_base64: z.string(),
  })
);
export type PostOptionalInput = z.infer<typeof PostOptionalInputSchema>;

export const UserOptionalInputSchema = UserOptionalDefaultsSchema.merge(
  z.object({
    icon_path: z.string().nullish().optional(),
    icon_base64: z.string().optional(),
  })
);
export type UserOptionalInput = z.infer<typeof UserOptionalInputSchema>;