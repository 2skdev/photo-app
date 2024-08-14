"use client";

import clsx from "clsx";
import { useRef } from "react";

type Props = {
  children?: React.ReactNode;
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
        className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50"
        onClick={onClick}
        ref={ref}
      >
        <div className={clsx("rounded bg-base-100", props.className)}>
          {props.children}
        </div>
      </div>
    );
  } else {
    return <></>;
  }
}
