import { MediaSwitcher } from "@/components/MediaSwitcher";
import { ReactNode } from "react";
import { SettingHeader, SettingList } from "./setting/components";

export default async function Layout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <>
      <div className="flex">
        <div>
          <SettingHeader />

          <MediaSwitcher
            pc={<SettingList className="w-52 border-r border-neutral" />}
          />
        </div>

        <div className="mx-2 flex w-full flex-col">{children}</div>
      </div>
    </>
  );
}
