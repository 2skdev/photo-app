"use client";

import { create } from "zustand";

type SnackbarType = "info" | "success" | "warning" | "error";

type SnackbarState = {
  isOpen: boolean;
  message: string;
  type?: SnackbarType;
  open: (message: string, type?: SnackbarType) => void;
  close: () => void;
};

export const useSnackbar = create<SnackbarState>()((set) => ({
  isOpen: false,
  message: "",
  open: (message, type) =>
    set({
      isOpen: true,
      message,
      type,
    }),
  close: () => set({ isOpen: false }),
}));
