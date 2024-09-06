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

export function ProgressProvider() {
  const { running } = useProgress();

  return (
    <>
      {running && (
        <progress className="progress progress-primary fixed inset-0 z-50 h-1 w-screen rounded-none"></progress>
      )}
    </>
  );
}
