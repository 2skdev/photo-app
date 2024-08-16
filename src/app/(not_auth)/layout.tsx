import { ReactNode } from "react";

export default function Layout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <main className="flex h-screen items-center justify-center">
      {children}
    </main>
  );
}
