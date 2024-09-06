"use client";

import { useEffect } from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ThemeType = "dark" | "light" | "auto";

type ThemeState = {
  theme: ThemeType;
  deviceTheme: ThemeType;
  setTheme: (theme: ThemeType) => void;
  setDeviceTheme: (theme: ThemeType) => void;
};

export const useTheme = create<ThemeState>()(
  persist(
    (set) => ({
      theme: "auto",
      deviceTheme: "light",
      setTheme: (theme: ThemeType) => set({ theme }),
      setDeviceTheme: (theme: ThemeType) => set({ deviceTheme: theme }),
    }),
    { name: "theme" },
  ),
);

export function useCurrentTheme() {
  const { theme, deviceTheme } = useTheme();
  return theme === "auto" ? deviceTheme : theme;
}

export function ThemeProvider() {
  const { setDeviceTheme } = useTheme();
  const currentTheme = useCurrentTheme();

  useEffect(() => {
    setDeviceTheme(
      window.matchMedia("(prefers-color-scheme: dark)").matches === true
        ? "dark"
        : "light",
    );
  }, []);

  useEffect(() => {
    const html = document.getElementsByTagName("html")[0];
    html.setAttribute("data-theme", currentTheme);
  }, [currentTheme]);

  return <></>;
}
