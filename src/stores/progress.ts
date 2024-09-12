"use client";

import { create } from "zustand";

type ProgressState = {
  running: boolean;
  withProgress: (fn: () => Promise<void>) => void;
};

export const useProgress = create<ProgressState>()((set) => ({
  running: false,
  withProgress: (fn: () => Promise<void>) => {
    set({ running: true });
    fn().then(() => set({ running: false }));
  },
}));
