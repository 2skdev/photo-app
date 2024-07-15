import { z } from "zod";
import { PostOptionalDefaultsSchema } from "../zod";

export const PostOptionalInputSchema = PostOptionalDefaultsSchema.merge(
  z.object({
    id: z.string().optional(),
    image_path: z.string().optional(),
    image_base64: z.string(),
  })
);

export type PostOptionalInput = z.infer<typeof PostOptionalInputSchema>;
