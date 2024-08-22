"use server";

import { createClient } from "@/libs/supabase/server";
import { getFileType } from "@/utils/image";
import random from "@/utils/random";
import { decode } from "base64-arraybuffer";

type Bucket = "User" | "Post";

export async function uploadImage(
  base64: string,
  bucket: Bucket,
  { path, upsert }: { path?: string; upsert?: boolean } = {},
): Promise<string | null> {
  const supabase = createClient();

  const { contentType, ext } = getFileType(base64);

  if (contentType && ext) {
    if (!path) {
      const {
        data: { user: auth },
      } = await supabase.auth.getUser();

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

export async function getPublicUrl(
  bucket: Bucket,
  path?: string | null,
): Promise<string | null> {
  const supabase = createClient();

  if (path) {
    const {
      data: { publicUrl },
    } = await supabase.storage.from(bucket).getPublicUrl(path);

    return publicUrl;
  } else {
    return null;
  }
}
