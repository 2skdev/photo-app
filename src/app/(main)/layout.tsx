import { getUnreadNotificationCount } from "@/actions/notification";
import { getLoginUser } from "@/actions/user";
import { MediaSwitcher } from "@/components/MediaSwitcher";
import { Bottombar, Sidebar } from "@/components/Navigation";
import { ReactNode } from "react";

export default async function Layout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const me = await getLoginUser();

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
        <div className="mb-14 w-full md:mb-0">{children}</div>
      </div>
    </>
  );
}
