import { Launch } from "@/components/Launch";
import { APP_NAME } from "@/constants/string";
import { MediaProvider } from "@/providers/MediaProvider";
import { ModalProvider } from "@/providers/ModalProvider";
import { SnackbarProvider } from "@/providers/SnackbarProvider";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { Inter } from "next/font/google";
import { ReactNode } from "react";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export async function generateMetadata() {
  return {
    title: APP_NAME,
  };
}

export default function Layout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <div id="header" />
        <main>{children}</main>

        <Launch />

        <MediaProvider />
        <SnackbarProvider />
        <ModalProvider />
        <ThemeProvider />
      </body>
    </html>
  );
}
