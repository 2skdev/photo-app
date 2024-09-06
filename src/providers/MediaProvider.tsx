"use client";

import { useEffect } from "react";
import { create } from "zustand";

type MediaType = "sp" | "pc";

type MediaState = {
  type: MediaType;
  setMediaType: (type: MediaType) => void;
};

export const useMedia = create<MediaState>()((set) => ({
  type: "pc",
  setMediaType: (type) => set({ type }),
}));

export function MediaProvider() {
  const { setMediaType } = useMedia();
  const onChange = (matches: boolean) => setMediaType(matches ? "sp" : "pc");

  useEffect(() => {
    const mql = matchMedia("(width <= 768px)");

    mql.onchange = (e) => onChange(e.matches);
    onChange(mql.matches);

    return () => {
      mql.onchange = null;
    };
  }, []);

  return <></>;
}
