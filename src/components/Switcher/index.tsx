"use client";

import { ReactNode, useLayoutEffect, useState } from "react";

type Props = {
  sp?: ReactNode;
  pc?: ReactNode;
};

export default function Switcher(props: Props) {
  const [layout, setLayout] = useState<"sp" | "pc">("pc");

  useLayoutEffect(() => {
    const onResize = () => setLayout(window.innerWidth <= 768 ? "sp" : "pc");

    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // tailwind breakpoint md
  if (layout === "sp") {
    return <>{props.sp && props.sp}</>;
  } else {
    return <>{props.pc && props.pc}</>;
  }
}
