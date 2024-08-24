"use client";

import { useMediaType } from "@/hooks/mediaType";
import { ReactNode } from "react";

type Props = {
  sp?: ReactNode;
  pc?: ReactNode;
};

export function MediaSwitcher(props: Props) {
  const mediaType = useMediaType();

  if (mediaType === "sp") {
    return <>{props.sp && props.sp}</>;
  } else {
    return <>{props.pc && props.pc}</>;
  }
}
