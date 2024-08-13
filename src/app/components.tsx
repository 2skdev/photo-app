"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export function SidebarLink({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon: ReactNode;
}) {
  "use client";
  const pathname = usePathname();

  return (
    <Link
      className={clsx(
        "btn btn-block flex justify-start",
        pathname == href ? "btn-neutral" : "btn-ghost"
      )}
      href={href}
    >
      <div className="flex items-center space-x-3">
        {icon}
        <div>{label}</div>
      </div>
    </Link>
  );
}
