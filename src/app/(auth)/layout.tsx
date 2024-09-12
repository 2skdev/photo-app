import { getUnreadNotificationCount } from "@/actions/notification";
import { getPublicUrl } from "@/actions/storage";
import { getLoginUser } from "@/actions/user";
import { MediaSwitcher } from "@/components/MediaSwitcher";
import { UserImage } from "@/types/zod";
import { ReactNode } from "react";
import { Bottombar, Sidebar } from "./components";

export default async function Layout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const me: UserImage = await getLoginUser();
  me.iconSrc = (await getPublicUrl("User", me.iconPath)) ?? undefined;

  const unreadNotificationCount = await getUnreadNotificationCount();

  return (
    <>
      <div className="flex">
        <MediaSwitcher
          sp={
            <Bottombar
              me={me}
              unreadNotificationCount={unreadNotificationCount}
            />
          }
          pc={
            <Sidebar
              me={me}
              unreadNotificationCount={unreadNotificationCount}
            />
          }
        />

        {/* margin for bottom nav height */}
        <div className="container mx-auto mb-14 max-w-3xl p-4 md:mb-0 md:p-10">
          {children}
        </div>
      </div>
    </>
  );
}
