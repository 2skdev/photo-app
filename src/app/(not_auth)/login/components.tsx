"use client";

import Image from "next/image";
import { signInWithGoogle } from "./actions";

export function SignInWithGoogleButton() {
  return (
    <button
      onClick={() => signInWithGoogle()}
      className="btn btn-block flex flex-row justify-center"
    >
      <Image src="/oauth-google.svg" alt="Icon" width={24} height={24} />
      <div>Sign in with Google</div>
    </button>
  );
}
