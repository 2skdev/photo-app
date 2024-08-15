import { createClient } from "@/utils/supabase/server";
import clsx from "clsx";
import { MaterialSymbolsPerson } from "../icons";

type Props = {
  path: string | null;
  className?: string;
};

export default async function UserAvatar(props: Props) {
  const supabase = createClient();

  const url = await (async () => {
    if (props.path) {
      const {
        data: { publicUrl },
      } = await supabase.storage.from("User").getPublicUrl(props.path);

      return publicUrl;
    } else {
      return null;
    }
  })();

  if (url) {
    return <img className={clsx(props.className, "rounded-full")} src={url} />;
  } else {
    return (
      <div
        className={clsx(
          props.className,
          "overflow-hidden rounded-full bg-neutral",
        )}
      >
        <MaterialSymbolsPerson className="relative -left-[10%] h-[120%] w-[120%]" />
      </div>
    );
  }
}
