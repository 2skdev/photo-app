"use client";

import clsx from "clsx";
import { MaterialSymbolsPerson } from "./Icons";

type Props = {
  src?: string | null;
  className?: string;
};

export function UserAvatar(props: Props) {
  if (props.src) {
    return (
      <img className={clsx(props.className, "rounded-full")} src={props.src} />
    );
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
