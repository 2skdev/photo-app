"use client";

import { signOut } from "@/actions/auth";
import { Logo } from "@/components/Assets";
import {
  MdiAccount,
  MdiBell,
  MdiDotsHorizontal,
  MdiHome,
  MdiMagnify,
  MdiPlus,
} from "@/components/Icons";
import { PostFormModalButton } from "@/components/PostForm";
import { UserAvatar } from "@/components/UserAvatar";
import { APP_NAME } from "@/constants/string";
import { User } from "@/types/zod";
import { getPublicUrl } from "@/utils/storage";
import clsx from "clsx";
import { Ubuntu } from "next/font/google";
import Link from "next/link";
import { usePathname } from "next/navigation";

const ubuntu = Ubuntu({
  weight: "700",
  subsets: ["latin"],
});

export function Sidebar(props: { me: User; unreadNotificationCount: number }) {
  const pathname = usePathname();

  const items = [
    {
      href: "/",
      label: "ホーム",
      icon: <MdiHome className="h-6 w-6" />,
    },
    {
      href: "/search",
      label: "検索",
      icon: <MdiMagnify className="h-6 w-6" />,
    },
    {
      href: "/notifications",
      label: "通知",
      icon: (
        <div className="indicator">
          {props.unreadNotificationCount > 0 && (
            <span className="badge indicator-item badge-primary badge-xs">
              {props.unreadNotificationCount}
            </span>
          )}
          <MdiBell className="h-6 w-6" />
        </div>
      ),
    },
    {
      href: `/${props.me.accountName}`,
      label: "プロフィール",
      icon: <MdiAccount className="h-6 w-6" />,
    },
  ];

  return (
    <div className="sticky top-0 flex h-screen w-80 flex-col border-r border-neutral p-4">
      <div className="mx-4 mb-6 mt-2 flex items-center justify-start">
        <Logo className="h-8 w-8" />
        <div className={clsx("ml-2", ubuntu.className)}>{APP_NAME}</div>
      </div>

      {items.map((item, index) => (
        <Link
          key={index}
          className={clsx(
            "btn btn-block flex justify-start",
            pathname === item.href ? "" : "btn-ghost",
          )}
          href={item.href}
        >
          <div className="flex items-center space-x-3">
            {item.icon}
            <div>{item.label}</div>
          </div>
        </Link>
      ))}

      <PostFormModalButton className="btn btn-primary btn-block mt-4 rounded-full">
        投稿
      </PostFormModalButton>

      <div className="dropdown dropdown-top mt-auto w-full">
        <div
          tabIndex={0}
          role="button"
          className="btn btn-ghost btn-block flex justify-start"
        >
          <UserAvatar
            src={getPublicUrl("User", props.me.iconPath)}
            className="h-10 w-10"
          />
          <div className="flex flex-col items-start">
            <div>{props.me.accountName}</div>
            <div className="text-sm font-light">@{props.me.accountName}</div>
          </div>
          <div className="ml-auto">
            <MdiDotsHorizontal className="h-6 w-6" />
          </div>
        </div>

        <ul
          tabIndex={0}
          className="menu dropdown-content z-10 mb-2 w-52 rounded-box bg-neutral p-2"
        >
          <li>
            <Link href="/setting">設定</Link>
          </li>
          <li>
            <button onClick={async () => await signOut()}>ログアウト</button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export function Bottombar(props: {
  me: User;
  unreadNotificationCount: number;
}) {
  const pathname = usePathname();

  const items = [
    {
      href: "/",
      label: "ホーム",
      icon: <MdiHome className="h-6 w-6" />,
    },
    {
      href: "/search",
      label: "検索",
      icon: <MdiMagnify className="h-6 w-6" />,
    },
    {
      href: "/notifications",
      label: "通知",
      icon: (
        <div className="indicator">
          {props.unreadNotificationCount > 0 && (
            <span className="badge indicator-item badge-primary badge-xs">
              {props.unreadNotificationCount}
            </span>
          )}
          <MdiBell className="h-6 w-6" />
        </div>
      ),
    },
    {
      href: `/${props.me.accountName}`,
      label: "プロフィール",
      icon: <MdiAccount className="h-6 w-6" />,
    },
  ];

  return (
    <>
      <div className="fixed bottom-0 z-10 flex h-14 w-screen items-center justify-around border-t border-neutral bg-base-100">
        {items.map((item, index) => (
          <Link
            key={index}
            className={clsx(
              "btn btn-ghost",
              pathname === item.href ? "text-primary" : "",
            )}
            href={item.href}
          >
            {item.icon}
          </Link>
        ))}
      </div>

      {pathname === "/" && (
        <div className="fixed bottom-20 right-6 z-10">
          <PostFormModalButton className="btn btn-circle btn-primary shadow">
            <MdiPlus className="h-6 w-6" />
          </PostFormModalButton>
        </div>
      )}
    </>
  );
}
