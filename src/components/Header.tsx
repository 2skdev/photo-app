"use client";

import { ReactNode } from "react";
import { createPortal } from "react-dom";
import { MediaSwitcher } from "./MediaSwitcher";

type Props = {
  children?: ReactNode;
};

export function Header(props: Props) {
  return (
    <MediaSwitcher
      pc={
        typeof props.children === "string" ? (
          <div className="mb-8 text-2xl font-bold">{props.children}</div>
        ) : (
          props.children
        )
      }
      sp={
        typeof window !== "undefined" &&
        createPortal(
          <div className="flex h-14 w-full items-center border-b border-neutral pl-4">
            {typeof props.children === "string" ? (
              <div className="font-bold">{props.children}</div>
            ) : (
              props.children
            )}
          </div>,
          document.getElementById("header")!,
        )
      }
    />
  );
}
