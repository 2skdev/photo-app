"use client";

import { createClient } from "@/utils/supabase/client";
import { signInWithGoogle } from "./actions";

export function SignInWithGoogleButton() {
  const signIn = async () => {
    const supabase = createClient();

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "http://localhost:3000/",
      },
    });

    console.log(data, error);
  };

  return (
    <button onClick={() => signInWithGoogle()}>Sign in with Google</button>
  );
}
