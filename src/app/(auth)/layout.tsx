import { getLoginUser } from "@/actions/user";
import {
  MaterialSymbolsMoreHoriz,
  MaterialSymbolsOtherHouses,
  MaterialSymbolsPerson,
  MaterialSymbolsSearchRounded,
} from "@/components/icons";
import UserAvatar from "@/components/UserAvatar";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import { LogoutButton, PostModalButton, SidebarLink } from "./components";

export default async function Layout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const me = await getLoginUser();

  return (
    <>
      <main className="flex">
        <div className="flex h-screen w-80 flex-col border-r border-neutral p-4">
          <div className="mx-4 mb-6 mt-2 flex items-center justify-start">
            <Image src="/icon.svg" alt="Icon" width={24} height={24} />
            <div className="ml-2">Photo App</div>
          </div>

          <SidebarLink
            href="/"
            label="ホーム"
            icon={<MaterialSymbolsOtherHouses className="h-6 w-6" />}
          />
          <SidebarLink
            href="/search"
            label="検索"
            icon={<MaterialSymbolsSearchRounded className="h-6 w-6" />}
          />
          <SidebarLink
            href={`/${me.account_name}`}
            label="プロフィール"
            icon={<MaterialSymbolsPerson className="h-6 w-6" />}
          />

          <PostModalButton />

          <div className="mt-auto">
            <div className="dropdown dropdown-top w-full">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-block flex justify-start"
              >
                <UserAvatar path={me.icon_path} className="h-10 w-10" />
                <div className="flex flex-col items-start">
                  <div>{me.display_name}</div>
                  <div className="text-sm font-light">@{me.account_name}</div>
                </div>
                <div className="ml-auto">
                  <MaterialSymbolsMoreHoriz className="h-6 w-6" />
                </div>
              </div>

              <ul
                tabIndex={0}
                className="menu dropdown-content z-[1] mb-2 w-52 rounded-box bg-neutral p-2"
              >
                <li>
                  <Link href="/setting">設定</Link>
                </li>
                <li>
                  <LogoutButton />
                </li>
              </ul>
            </div>
          </div>
        </div>
        {children}
      </main>
    </>
  );
}
