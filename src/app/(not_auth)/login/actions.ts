"use server";

import { baseUrl } from "@/constants/url";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function signInWithGoogle() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${baseUrl}/auth/callback`,
    },
  });

  if (data.url) {
    redirect(data.url);
  }
}
