"use client";

import { Icon } from "@iconify/react/dist/iconify.js";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function SettingList({ className }: { className?: string }) {
  const pathname = usePathname();

  const defaultClassNames =
    "flex h-8 items-center justify-between px-4 w-full py-6 hover:bg-neutral";

  return (
    <div className={clsx("flex flex-col", className)}>
      <Link
        href="/setting/account"
        className={clsx(
          defaultClassNames,
          pathname === "/setting/account" ? "bg-neutral" : "",
        )}
      >
        <div>アカウント</div>
        <Icon icon="mdi:chevron-right" />
      </Link>
      <Link
        href="/setting/theme"
        className={clsx(
          defaultClassNames,
          pathname === "/setting/theme" ? "bg-neutral" : "",
        )}
      >
        <div>テーマ</div>
        <Icon icon="mdi:chevron-right" />
      </Link>
      <Link href="/terms" target="_blank" className={clsx(defaultClassNames)}>
        <div>利用規約</div>
        <Icon icon="mdi:open-in-new" />
      </Link>
    </div>
  );
}
