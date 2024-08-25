import { z } from "zod";
import { PostOptionalDefaultsSchema, UserOptionalDefaultsSchema } from "../zod";

export const PostOptionalImageSourceSchema = PostOptionalDefaultsSchema.merge(
  z.object({
    imageSrc: z.string(),
  }),
);
export type PostOptionalImageSource = z.infer<
  typeof PostOptionalImageSourceSchema
>;

export const PostOptionalInputSchema = PostOptionalImageSourceSchema.merge(
  z.object({
    id: z.string().optional(),
    imagePath: z.string().nullish().optional(),
  }),
);
export type PostOptionalInput = z.infer<typeof PostOptionalInputSchema>;

export const UserOptionalImageSourceSchema = UserOptionalDefaultsSchema.merge(
  z.object({
    iconSrc: z.string().optional(),
  }),
);
export type UserOptionalImageSource = z.infer<
  typeof UserOptionalImageSourceSchema
>;

export const UserOptionalInputSchema = UserOptionalImageSourceSchema.merge(
  z.object({
    id: z.string().optional(),
    iconPath: z.string().nullish().optional(),
  }),
);
export type UserOptionalInput = z.infer<typeof UserOptionalInputSchema>;
