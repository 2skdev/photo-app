import { createClient } from "@/libs/supabase/client";
import { Bucket } from "@/types/storage";

export function getPublicUrl(
  bucket: Bucket,
  path?: string | null,
): string | null {
  const supabase = createClient();

  if (path) {
    const {
      data: { publicUrl },
    } = supabase.storage.from(bucket).getPublicUrl(path);

    return publicUrl;
  } else {
    return null;
  }
}
