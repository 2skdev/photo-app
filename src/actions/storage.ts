"use server";

import { createClient } from "@/libs/supabase/server";
import { Bucket } from "@/types/storage";
import { getFileType } from "@/utils/image";
import random from "@/utils/random";
import { decode } from "base64-arraybuffer";
import { getAuthUser } from "./auth";

export async function uploadImage(
  bucket: Bucket,
  base64: string,
  { path, upsert }: { path?: string; upsert?: boolean } = {},
): Promise<string | null> {
  const supabase = createClient();

  const { contentType, ext } = getFileType(base64);

  if (contentType && ext) {
    if (!path) {
      const auth = await getAuthUser();

      const filename = `${random(32)}${ext}`;

      if (auth) {
        path = `${auth.id}/${filename}`;
      } else {
        path = `public/${filename}`;
      }
    }

    const bytes = decode(base64.split("base64,")[1]);

    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(path, bytes, { contentType, upsert });

    if (error) {
      throw error;
    }

    return data?.path ?? null;
  }

  return null;
}
