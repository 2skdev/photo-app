"use server";

import { BASE_URL } from "@/constants/url";
import { createClient } from "@/libs/supabase/server";
import { SupabaseClient, User } from "@supabase/supabase-js";
import { redirect } from "next/navigation";

export async function signInWithGoogle() {
  const supabase = createClient();

  const { data } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${BASE_URL}/auth/callback`,
    },
  });

  if (data.url) {
    redirect(data.url);
  }
}

export async function signOut() {
  const supabase = createClient();

  await supabase.auth.signOut();

  redirect("/login");
}

export async function getAuthUser(
  client?: SupabaseClient, // for middleware
): Promise<User | null> {
  const supabase = client ?? createClient();

  const {
    data: { user: auth },
  } = await supabase.auth.getUser();

  return auth;
}
