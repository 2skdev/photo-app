import { ReactNode } from "react";

export default async function Layout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div className="container mx-auto max-w-3xl p-4 md:p-10">{children}</div>
  );
}
