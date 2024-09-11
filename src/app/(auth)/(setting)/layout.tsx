import { Header } from "@/components/Header";
import { MediaSwitcher } from "@/components/MediaSwitcher";
import { ReactNode } from "react";
import { SettingList } from "./setting/components";

export default async function Layout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <>
      <Header>設定</Header>

      <div className="flex">
        <MediaSwitcher
          pc={<SettingList className="w-56 border-r border-neutral" />}
        />
        <div className="ml-2 flex w-full flex-col">{children}</div>
      </div>
    </>
  );
}
