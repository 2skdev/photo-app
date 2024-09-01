"use client";

import { useMedia } from "@/providers/MediaProvider";
import { ReactNode } from "react";

type Props = {
  sp?: ReactNode;
  pc?: ReactNode;
};

export function MediaSwitcher(props: Props) {
  const { type } = useMedia();

  if (type === "sp") {
    return <>{props.sp && props.sp}</>;
  } else {
    return <>{props.pc && props.pc}</>;
  }
}
