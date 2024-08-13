"use client";

import { signInWithGoogle } from "./actions";

export function SignInWithGoogleButton() {
  return (
    <button onClick={() => signInWithGoogle()}>Sign in with Google</button>
  );
}
