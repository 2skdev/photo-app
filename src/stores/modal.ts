"use client";

import { ReactNode } from "react";
import { create } from "zustand";

type ModalState = {
  stack: Array<{ child: ReactNode; onRequestClose?: () => boolean }>;
  open: (child: ReactNode, onRequestClose?: () => boolean) => void;
  close: () => void;
};

export const useModal = create<ModalState>()((set) => ({
  stack: [],
  open: (child, onRequestClose) =>
    set((state) => ({
      stack: [
        ...state.stack,
        {
          child: child,
          onRequestClose: onRequestClose,
        },
      ],
    })),
  close: () => set((state) => ({ stack: state.stack.slice(0, -1) })),
}));
