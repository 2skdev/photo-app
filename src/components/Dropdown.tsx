"use client";

import clsx from "clsx";
import { ReactNode } from "react";

type Props = {
  className?: string;
  button?: ReactNode;
  list?: ReactNode;
};

export function Dropdown(props: Props) {
  return (
    <>
      <div className={clsx("dropdown", props.className)}>
        <div tabIndex={0} className="flex justify-start">
          {props.button}
        </div>

        <ul
          tabIndex={0}
          className="menu dropdown-content z-10 mb-2 w-72 rounded-box bg-neutral"
          onClick={(e) => e.currentTarget.blur()}
        >
          {props.list}
        </ul>
      </div>
    </>
  );
}
