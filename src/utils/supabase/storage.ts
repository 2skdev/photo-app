"use server";

import { decode } from "base64-arraybuffer";
import random from "../random";
import { createClient } from "./server";

export async function uploadImage(
  base64: string,
  bucket: string,
  path?: string,
  upsert: boolean = false
): Promise<string | null> {
  const supabase = createClient();

  const match = base64.match(/^data:(\w+\/(\w+))/);

  if (match) {
    const contentType = match[1];
    const ext = match[2];

    if (!path) {
      const {
        data: { user: auth },
      } = await supabase.auth.getUser();

      const filename = `${random(32)}.${ext}`;

      if (auth) {
        path = `${auth.id}/${filename}`;
      } else {
        path = `public/${filename}`;
      }
    }

    const bytes = decode(base64.split("base64,")[1]);

    const { data } = await supabase.storage
      .from(bucket)
      .upload(path, bytes, { contentType, upsert });

    return data?.path ?? null;
  }

  return null;
}
