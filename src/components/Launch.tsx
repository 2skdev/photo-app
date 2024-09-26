"use client";

import { useEffect, useState } from "react";
import { AppIcon } from "./Assets";

export function Launch() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex h-screen w-screen items-center justify-center bg-base-100">
        <AppIcon className="h-24 w-24" />
      </div>
    );
  } else {
    return <></>;
  }
}
