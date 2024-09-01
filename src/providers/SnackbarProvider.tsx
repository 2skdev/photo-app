"use client";

import {
  MdiAlertBoxOutline,
  MdiCheckCircleOutline,
  MdiCloseOctagonOutline,
  MdiInformationOutline,
} from "@/components/Icons";
import clsx from "clsx";
import { useEffect, useState } from "react";
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
  close: () =>
    set((state) => ({
      isOpen: false,
    })),
}));

export function SnackbarProvider() {
  const { isOpen, message, type, close } = useSnackbar();
  const [animate, setAnimate] = useState("animate-fade-in");

  const symbol = (() => {
    switch (type) {
      case "success":
        return <MdiCheckCircleOutline />;
      case "warning":
        return <MdiAlertBoxOutline />;
      case "error":
        return <MdiCloseOctagonOutline />;
      default:
        return <MdiInformationOutline />;
    }
  })();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        onClick();
      }, 3000);
    }
  }, [isOpen]);

  const onClick = () => {
    setAnimate("animate-fade-out");
    setTimeout(() => {
      setAnimate("animate-fade-in");
      close();
    }, 500);
  };

  return (
    <>
      {isOpen && (
        <div className={clsx("fixed bottom-0 z-50 w-full p-4", animate)}>
          <div
            role="alert"
            className={clsx("alert", type ? `alert-${type}` : "")}
            onClick={onClick}
          >
            {symbol}
            <span>{message}</span>
          </div>
        </div>
      )}
    </>
  );
}
