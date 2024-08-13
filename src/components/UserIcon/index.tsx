import { createClient } from "@/utils/supabase/server";
import clsx from "clsx";
import { MaterialSymbolsPerson } from "../icons";

type Props = {
  path: string | null;
  className?: string;
};

export default async function UserIcon(props: Props) {
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
          "rounded-full bg-neutral overflow-hidden"
        )}
      >
        <MaterialSymbolsPerson className="relative w-[120%] h-[120%] -left-[10%]" />
      </div>
    );
  }
}
