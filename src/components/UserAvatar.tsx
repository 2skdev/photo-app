"use client";

import clsx from "clsx";
import Image from "next/image";

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
        <Image
          src="/default-user-icon.png"
          alt="Icon"
          width={256}
          height={256}
        />
      </div>
    );
  }
}
