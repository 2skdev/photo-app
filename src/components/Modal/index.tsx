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
        "absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      )}
    >
      <div className={clsx("rounded bg-base-100", props.className)}>
        {props.children}
      </div>
    </div>
  );
}
