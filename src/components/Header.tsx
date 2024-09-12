"use client";

import { Icon } from "@iconify/react/dist/iconify.js";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import { createPortal } from "react-dom";
import { MediaSwitcher } from "./MediaSwitcher";

type Props = {
  children?: ReactNode;
  back?: boolean;
  action?: ReactNode;
  spOnly?: boolean;
};

export function Header(props: Props = { spOnly: false }) {
  const router = useRouter();

  return (
    <MediaSwitcher
      pc={
        !props.spOnly &&
        (typeof props.children === "string" ? (
          <div className="mb-8 text-2xl font-bold">{props.children}</div>
        ) : (
          props.children
        ))
      }
      sp={
        typeof window !== "undefined" &&
        createPortal(
          <div className="flex h-14 w-full items-center justify-between border-b border-neutral px-4">
            <div className="h-6 w-6">
              {props.back && (
                <div className="cursor-pointer" onClick={() => router.back()}>
                  <Icon icon="mdi:chevron-left" className="h-6 w-6" />
                </div>
              )}
            </div>
            {typeof props.children === "string" ? (
              <div className="w-full text-center font-bold">
                {props.children}
              </div>
            ) : (
              props.children
            )}
            <div className="h-6 w-6">{props.action}</div>
          </div>,
          document.getElementById("header")!,
        )
      }
    />
  );
}
