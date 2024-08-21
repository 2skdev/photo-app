import { getLoginUser } from "@/actions/user";
import { getPublicUrl } from "@/utils/supabase/storage";
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
        <Navigation
          me={me}
          iconSrc={await getPublicUrl("User", me.icon_path)}
        />
        <div className="container mx-auto max-w-3xl p-4 md:p-10">
          {children}
        </div>
      </main>
    </>
  );
}
