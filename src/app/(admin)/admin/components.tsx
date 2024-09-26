"use client";

import { usePathname, useRouter } from "next/navigation";

export function Breadcrumbs() {
  const router = useRouter();
  const pathname = usePathname();
  const paths = pathname.split("/").filter((path) => path !== "");

  const onClick = (path: string) => {
    router.push(`/${paths.slice(0, paths.indexOf(path) + 1).join("/")}`);
  };

  return (
    <div className="breadcrumbs pb-4 text-sm">
      <ul>
        {paths.map((path) => (
          <li
            key={path}
            className="cursor-pointer"
            onClick={() => onClick(path)}
          >
            {path}
          </li>
        ))}
      </ul>
    </div>
  );
}
