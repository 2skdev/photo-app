import { Launch } from "@/components/Launch";
import { APP_NAME } from "@/constants/string";
import { Viewport } from "next";
import { Inter } from "next/font/google";
import { cookies } from "next/headers";
import { ReactNode } from "react";
import {
  AppHandler,
  ModalHandler,
  ProgressHandler,
  SnackbarHandler,
} from "./components";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export async function generateMetadata() {
  return {
    title: APP_NAME,
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function Layout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  // set initial theme from cookie
  const theme = (() => {
    const cookie = cookies();
    const theme = cookie.get("theme")?.value;

    if (theme) {
      const state = JSON.parse(theme)["state"];
      return state["theme"] === "auto" ? state["deviceTheme"] : state["theme"];
    } else {
      return "light";
    }
  })();

  return (
    <html lang="ja" data-theme={theme}>
      <body className={inter.className}>
        <div id="header" />
        <main>{children}</main>

        <Launch />
        <AppHandler />
        <ModalHandler />
        <ProgressHandler />
        <SnackbarHandler />
      </body>
    </html>
  );
}
