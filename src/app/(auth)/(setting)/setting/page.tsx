import { MediaSwitcher } from "@/components/MediaSwitcher";
import { SettingList } from "./components";

export default function Page() {
  return (
    <>
      <MediaSwitcher sp={<SettingList className="w-full" />} />
    </>
  );
}
