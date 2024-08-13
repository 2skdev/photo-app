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
      <div className="flex flex-col p-4 w-80 h-screen border-r border-neutral">
        <div className="flex justify-start items-center mt-2 mb-6 mx-4">
          <Image src="/icon.svg" alt="Icon" width={24} height={24} />
          <div className="ml-2">Photo App</div>
        </div>

        <SidebarLink
          href="/"
          label="ホーム"
          icon={<MaterialSymbolsOtherHouses className="w-6 h-6" />}
        />
        <SidebarLink
          href="/search"
          label="検索"
          icon={<MaterialSymbolsSearchRounded className="w-6 h-6" />}
        />
        <SidebarLink
          href={`/${me.account_name}`}
          label="プロフィール"
          icon={<MaterialSymbolsPerson className="w-6 h-6" />}
        />

        <Link
          className="btn btn-block btn-primary rounded-full mt-4"
          href="/new"
        >
          投稿
        </Link>

        <div className="mt-auto">
          <div className="btn btn-block btn-ghost flex justify-start">
            <UserIcon path={me.icon_path} className="w-10 h-10" />
            <div className="flex flex-col items-start">
              <div>{me.display_name}</div>
              <div className="text-sm font-light">@{me.account_name}</div>
            </div>
            <div className="ml-auto">
              <MaterialSymbolsMoreHoriz className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
