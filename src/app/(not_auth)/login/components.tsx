"use client";

import { signInWithGoogle } from "@/actions/auth";
import { OAuthGoogle } from "@/components/Assets";
import { useProgress } from "@/providers/ProgressProvider";

export function SignInWithGoogleButton() {
  const { withProgress } = useProgress();

  const onSignIn = async () => {
    withProgress(async () => {
      await signInWithGoogle();
    });
  };

  return (
    <button
      onClick={onSignIn}
      className="btn btn-block flex flex-row justify-center"
    >
      <OAuthGoogle className="h-6 w-6" />
      <div>Sign in with Google</div>
    </button>
  );
}
