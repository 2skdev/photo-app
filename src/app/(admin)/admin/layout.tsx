import Link from "next/link";
import { ReactNode } from "react";
import { Breadcrumbs } from "./components";

export default async function Layout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <>
      <div className="flex">
        <div className="sticky top-0 flex h-screen w-80 flex-col border-r border-r-neutral p-4">
          <ul className="menu space-y-2">
            <li>
              <div className="menu-title">管理</div>
              <ul>
                <li className="my-2 cursor-pointer">
                  <Link href="/admin/user">ユーザー</Link>
                </li>
                <li className="my-2 cursor-pointer">
                  <Link href="/admin/user">投稿</Link>
                </li>
                <li className="my-2 cursor-pointer">
                  <Link href="/admin/user">スポット</Link>
                </li>
                <li className="my-2 cursor-pointer">
                  <Link href="/admin/user">スパム</Link>
                </li>
              </ul>
            </li>
            <li>
              <div className="menu-title">システム</div>
              <ul>
                <li className="my-2 cursor-pointer">
                  <Link href="/admin/env">環境変数</Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>

        <div className="container mx-auto max-w-3xl p-4">
          <Breadcrumbs />
          {children}
        </div>
      </div>
    </>
  );
}
