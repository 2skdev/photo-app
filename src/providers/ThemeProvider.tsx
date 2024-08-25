"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type ThemeType = "dark" | "light" | "auto";

interface ThemeContextType {
  setTheme: (type: ThemeType) => void;
  theme: ThemeType;
}

const ThemeContext = createContext<ThemeContextType>({
  setTheme: (type) => {
    throw new Error("setTheme not implemented");
  },
  theme: "auto",
});

export function useThemeContext() {
  return useContext(ThemeContext);
}

export function HtmlThemeProvider(
  props: React.HtmlHTMLAttributes<HTMLHtmlElement>,
) {
  const [theme, _setTheme] = useState<ThemeType>("auto");
  const [devideTheme, setDeviceTheme] = useState<ThemeType>("auto");

  useEffect(() => {
    const localStorageTheme = localStorage.getItem("color-theme");
    if (localStorageTheme) {
      _setTheme(localStorageTheme as ThemeType);
    }

    setDeviceTheme(
      window.matchMedia("(prefers-color-scheme: dark)").matches === true
        ? "dark"
        : "light",
    );
  }, []);

  const setTheme = (type: ThemeType) => {
    _setTheme(type);
    localStorage.setItem("color-theme", type);
  };

  return (
    <ThemeContext.Provider value={{ setTheme, theme }}>
      <html {...props} data-theme={theme === "auto" ? devideTheme : theme} />
    </ThemeContext.Provider>
  );
}
