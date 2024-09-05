"use client";

import React, { ReactNode, useEffect, useRef, useState } from "react";
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
  close: () =>
    set((state) => ({
      stack: state.stack.slice(0, -1),
    })),
}));

export function ModalProvider() {
  const { stack, close } = useModal();
  const [stackCount, setStackCount] = useState(0);
  const backdropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (stack.length === 0) {
      document.body.style.paddingRight = "0px";
      document.body.style.overflow = "auto";
    } else if (stackCount === 0 && stack.length === 1) {
      // hide scrollbar
      document.body.style.paddingRight = `${window.innerWidth - document.body.clientWidth}px`;
      document.body.style.overflow = "hidden";
    }

    setStackCount(stack.length);
  }, [stack]);

  const onBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === backdropRef.current) {
      const onRequestClose =
        stack[stack.length - 1].onRequestClose ?? (() => true);

      if (onRequestClose()) {
        close();
      }
    }
  };

  return (
    <>
      {stack.map((item, index) => (
        <div
          key={index}
          ref={index === stack.length - 1 ? backdropRef : null}
          className="fixed inset-0 z-10 flex h-screen w-screen items-center justify-center bg-black bg-opacity-50"
          onClick={onBackdropClick}
        >
          <div className="relative z-10 h-screen w-screen rounded bg-base-100 p-4 md:h-auto md:w-auto">
            {item.child}
          </div>
        </div>
      ))}
    </>
  );
}
