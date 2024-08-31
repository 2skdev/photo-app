"use client";

import { useEffect, useState } from "react";
import { create } from "zustand";

export type ThemeType = "dark" | "light" | "auto";

type ThemeState = {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
};

export const useTheme = create<ThemeState>()((set) => ({
  theme: "auto",
  setTheme: (theme) =>
    set({
      theme,
    }),
}));

export function ThemeProvider() {
  const { theme, setTheme } = useTheme();
  const [deviceTheme, setDeviceTheme] = useState<ThemeType>("light");

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
    html.setAttribute("data-theme", theme === "auto" ? deviceTheme : theme);

    localStorage.setItem("color-theme", theme);
  }, [theme, deviceTheme]);

  return <></>;
}
