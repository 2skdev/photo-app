"use client";

import { signInWithGoogle } from "@/actions/auth";
import { OAuthGoogle } from "@/components/Assets";

export function SignInWithGoogleButton() {
  return (
    <button
      onClick={() => signInWithGoogle()}
      className="btn btn-block flex flex-row justify-center"
    >
      <OAuthGoogle className="h-6 w-6" />
      <div>Sign in with Google</div>
    </button>
  );
}
