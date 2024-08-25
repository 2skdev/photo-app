import { z } from "zod";
import {
  PostOptionalDefaultsSchema,
  PostSchema,
  UserOptionalDefaultsSchema,
  UserSchema,
} from "../zod";

export const PostImageSchema = PostSchema.merge(
  z.object({
    imageSrc: z.string(),
  }),
);
export type PostImage = z.infer<typeof PostImageSchema>;

export const PostOptionalInputSchema = PostOptionalDefaultsSchema.merge(
  z.object({
    id: z.string().optional(),
    imagePath: z.string().nullish().optional(),
    imageSrc: z.string(),
  }),
);
export type PostOptionalInput = z.infer<typeof PostOptionalInputSchema>;

export const UserImageSchema = UserSchema.merge(
  z.object({
    iconSrc: z.string().optional(),
  }),
);
export type UserImage = z.infer<typeof UserImageSchema>;

export const UserOptionalInputSchema = UserOptionalDefaultsSchema.merge(
  z.object({
    id: z.string().optional(),
    iconPath: z.string().nullish().optional(),
    iconSrc: z.string().optional(),
  }),
);
export type UserOptionalInput = z.infer<typeof UserOptionalInputSchema>;
