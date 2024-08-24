import { getPublicUrl } from "@/actions/storage";
import { getLoginUser } from "@/actions/user";
import { ReactNode } from "react";
import { Navigation } from "./components";

export default async function Layout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const me = await getLoginUser();
  return (
    <>
      <main className="flex">
        <Navigation me={me} iconSrc={await getPublicUrl("User", me.iconPath)} />

        {/* margin for bottom nav height */}
        <div className="container mx-auto mb-14 max-w-3xl p-4 md:mb-0 md:p-10">
          {children}
        </div>
      </main>
    </>
  );
}
