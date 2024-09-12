"use client";

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
