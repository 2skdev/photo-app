import { getLoginUser } from "@/actions/user";
import {
  MaterialSymbolsMoreHoriz,
  MaterialSymbolsOtherHouses,
  MaterialSymbolsPerson,
  MaterialSymbolsSearchRounded,
} from "@/components/icons";
import UserIcon from "@/components/UserIcon";
import Image from "next/image";
import Link from "next/link";
import { SidebarLink } from "./components";

export default async function Page() {
  const me = await getLoginUser();

  return (
    <main className="">
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

        <Link
          className="btn btn-primary btn-block mt-4 rounded-full"
          href="/new"
        >
          投稿
        </Link>

        <div className="mt-auto">
          <div className="btn btn-ghost btn-block flex justify-start">
            <UserIcon path={me.icon_path} className="h-10 w-10" />
            <div className="flex flex-col items-start">
              <div>{me.display_name}</div>
              <div className="text-sm font-light">@{me.account_name}</div>
            </div>
            <div className="ml-auto">
              <MaterialSymbolsMoreHoriz className="h-6 w-6" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
