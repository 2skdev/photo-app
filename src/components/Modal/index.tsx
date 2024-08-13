"use client";

import clsx from "clsx";

type Props = {
  children?: React.ReactNode;
  show?: boolean;
  className?: string;
};

export default function Modal(props: Props) {
  return (
    <div
      tabIndex={-1}
      className={clsx(
        props.show ? "" : "hidden",
        "absolute inset-0 flex items-center justify-center bg-black bg-opacity-50",
      )}
    >
      <div className={clsx("rounded bg-base-100", props.className)}>
        {props.children}
      </div>
    </div>
  );
}
