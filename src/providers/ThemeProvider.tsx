"use client";

import { useEffect } from "react";
import { create } from "zustand";

export type ThemeType = "dark" | "light" | "auto";

type ThemeState = {
  theme: ThemeType;
  deviceTheme: ThemeType;
  setTheme: (theme: ThemeType) => void;
  setDeviceTheme: (theme: ThemeType) => void;
};

export const useTheme = create<ThemeState>()((set, get) => ({
  theme: "auto",
  deviceTheme: "light",
  setTheme: (theme) => {
    localStorage.setItem("color-theme", theme);
    return set({
      theme,
    });
  },
  setDeviceTheme: (theme) =>
    set(() => ({
      deviceTheme: theme,
    })),
}));

export function useCurrentTheme() {
  const { theme, deviceTheme } = useTheme();
  return theme === "auto" ? deviceTheme : theme;
}

export function ThemeProvider() {
  const { setTheme, setDeviceTheme } = useTheme();
  const currentTheme = useCurrentTheme();

  useEffect(() => {
    const item = localStorage.getItem("color-theme");
    if (item) {
      setTheme(item as ThemeType);
    }

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
