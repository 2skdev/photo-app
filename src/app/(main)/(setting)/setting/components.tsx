"use client";

import { MdiChevronRight, MdiOpenInNew } from "@/components/Icons";
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
        <MdiChevronRight />
      </Link>
      <Link
        href="/setting/theme"
        className={clsx(
          defaultClassNames,
          pathname === "/setting/theme" ? "bg-neutral" : "",
        )}
      >
        <div>テーマ</div>
        <MdiChevronRight />
      </Link>
      <Link href="/terms" target="_blank" className={clsx(defaultClassNames)}>
        <div>利用規約</div>
        <MdiOpenInNew />
      </Link>
    </div>
  );
}
