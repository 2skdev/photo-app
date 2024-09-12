"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

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
    {
      name: "theme",
      storage: createJSONStorage(() => ({
        getItem: async (name: string) => {
          const cookies: Record<string, string> = {};

          document.cookie.split("; ").map((cookie) => {
            const [key, value] = cookie.split("=");
            cookies[key] = decodeURIComponent(value);
          });

          return cookies[name];
        },
        setItem: (name: string, value: string) => {
          document.cookie = `${name}=${encodeURIComponent(value)}; expires=${new Date(2099, 12, 31).toUTCString()}; path=/`;
        },
        removeItem: (name: string) => {
          document.cookie = `${name}=""; expires=${new Date(1970, 1, 1).toUTCString()}; path=/`;
        },
      })),
    },
  ),
);

export function useCurrentTheme() {
  const { theme, deviceTheme } = useTheme();
  return theme === "auto" ? deviceTheme : theme;
}
