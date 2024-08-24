"use client";

import { ReactNode, useEffect, useRef } from "react";

type Props = {
  children?: ReactNode;
  show?: boolean;
  onRequestClose?: () => void;
};

export default function Modal(props: Props) {
  const backdropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (props.show) {
      // add scrollbar width padding
      document.body.style.paddingRight = `${window.innerWidth - document.body.clientWidth}px`;
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.paddingRight = "0px";
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.paddingRight = "0px";
      document.body.style.overflow = "auto";
    };
  }, [props.show]);

  const onBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === backdropRef.current) {
      props.onRequestClose?.();
    }
  };

  if (props.show) {
    return (
      <div
        ref={backdropRef}
        className="fixed inset-0 z-10 flex h-screen items-center justify-center bg-black bg-opacity-50"
        onClick={onBackdropClick}
      >
        <div className="h-screen w-screen rounded bg-base-100 p-4 md:h-auto md:w-auto">
          {props.children}
        </div>
      </div>
    );
  } else {
    return <></>;
  }
}
