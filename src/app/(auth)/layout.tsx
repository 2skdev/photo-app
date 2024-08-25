import { getPublicUrl } from "@/actions/storage";
import { getLoginUser } from "@/actions/user";
import { MediaSwitcher } from "@/components/MediaSwitcher";
import { UserImage } from "@/models/zodExtension";
import { ReactNode } from "react";
import { Bottombar, Sidebar } from "./components";

export default async function Layout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const me: UserImage = await getLoginUser();
  me.iconSrc = (await getPublicUrl("User", me.iconPath)) ?? undefined;

  return (
    <>
      <div className="flex">
        <MediaSwitcher sp={<Bottombar me={me} />} pc={<Sidebar me={me} />} />

        {/* margin for bottom nav height */}
        <div className="container mx-auto mb-14 max-w-3xl p-4 md:mb-0 md:p-10">
          {children}
        </div>
      </div>
    </>
  );
}
