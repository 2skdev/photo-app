"use client";

import clsx from "clsx";
import { ReactNode, useRef } from "react";

type Props = {
  children?: ReactNode;
  show?: boolean;
  className?: string;
  onRequestClose?: () => void;
};

export default function Modal(props: Props) {
  const ref = useRef<HTMLDivElement | null>(null);

  const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === ref.current) {
      props.onRequestClose?.();
    }
  };

  if (props.show) {
    return (
      <div
        tabIndex={-1}
        className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50"
        onClick={onClick}
        ref={ref}
      >
        <div
          className={clsx(
            "h-screen w-screen bg-base-100 md:h-auto md:w-auto",
            props.className,
          )}
        >
          {props.children}
        </div>
      </div>
    );
  } else {
    return <></>;
  }
}
