"use client";

import { ThemeType, useTheme } from "@/stores/theme";

export function ThemePicker() {
  const { theme, setTheme } = useTheme();

  const items: Array<{
    type: ThemeType;
    label: string;
  }> = [
    {
      type: "light",
      label: "ライト",
    },
    {
      type: "dark",
      label: "ダーク",
    },
    {
      type: "auto",
      label: "端末の設定に従う",
    },
  ];

  return (
    <>
      {items.map((item) => (
        <label key={item.type} className="label cursor-pointer">
          <span className="label-text">{item.label}</span>
          <input
            type="radio"
            className="radio"
            checked={theme === item.type}
            onChange={() => {
              setTheme(item.type);
            }}
          />
        </label>
      ))}
    </>
  );
}
