"use client";

import { Progress } from "@/components/Progress";
import { useMedia } from "@/stores/media";
import { useModal } from "@/stores/modal";
import { useProgress } from "@/stores/progress";
import { useSnackbar } from "@/stores/snackbar";
import { useCurrentTheme, useTheme } from "@/stores/theme";
import { Icon } from "@iconify/react/dist/iconify.js";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";

function MediaState() {
  const { setMediaType } = useMedia();
  const onChange = (matches: boolean) => setMediaType(matches ? "sp" : "pc");

  useEffect(() => {
    const mql = matchMedia("(width <= 768px)");

    mql.onchange = (e) => onChange(e.matches);
    onChange(mql.matches);

    return () => {
      mql.onchange = null;
    };
  }, []);

  return <></>;
}

function ThemeState() {
  const { setDeviceTheme } = useTheme();
  const currentTheme = useCurrentTheme();

  useEffect(() => {
    setDeviceTheme(
      window.matchMedia("(prefers-color-scheme: dark)").matches === true
        ? "dark"
        : "light",
    );
  }, []);

  useEffect(() => {
    const html = document.getElementsByTagName("html")[0];
    html.setAttribute("data-theme", currentTheme);
  }, [currentTheme]);

  return <></>;
}

export function AppHandler() {
  return (
    <>
      <MediaState />
      <ThemeState />
    </>
  );
}

export function ModalHandler() {
  const { stack, close } = useModal();
  const [stackCount, setStackCount] = useState(0);
  const backdropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (stack.length === 0) {
      document.body.style.paddingRight = "0px";
      document.body.style.overflow = "auto";
    } else if (stackCount === 0 && stack.length === 1) {
      // hide scrollbar
      document.body.style.paddingRight = `${window.innerWidth - document.body.clientWidth}px`;
      document.body.style.overflow = "hidden";
    }

    setStackCount(stack.length);
  }, [stack]);

  const onBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === backdropRef.current) {
      const onRequestClose =
        stack[stack.length - 1].onRequestClose ?? (() => true);

      if (onRequestClose()) {
        close();
      }
    }
  };

  return (
    <>
      {stack.map((item, index) => (
        <div
          key={index}
          ref={index === stack.length - 1 ? backdropRef : null}
          className="fixed inset-0 z-10 flex h-screen w-screen items-center justify-center bg-black bg-opacity-50"
          onClick={onBackdropClick}
        >
          <div className="relative z-10 h-screen w-screen overflow-y-auto rounded bg-base-100 p-4 md:h-auto md:w-auto">
            {item.child}
          </div>
        </div>
      ))}
    </>
  );
}

export function ProgressHandler() {
  const { running } = useProgress();

  return <>{running && <Progress />}</>;
}

export function SnackbarHandler() {
  const { isOpen, message, type, close } = useSnackbar();
  const [animate, setAnimate] = useState("animate-fade-in");

  const symbol = (() => {
    switch (type) {
      case "success":
        return <Icon icon="mdi:check-circle-outline" />;
      case "warning":
        return <Icon icon="mdi:alert-box-outline" />;
      case "error":
        return <Icon icon="mdi:close-octagon-outline" />;
      default:
        return <Icon icon="mdi:information-outline" />;
    }
  })();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        onClick();
      }, 3000);
    }
  }, [isOpen]);

  const onClick = () => {
    setAnimate("animate-fade-out");
    setTimeout(() => {
      setAnimate("animate-fade-in");
      close();
    }, 500);
  };

  return (
    <>
      {isOpen && (
        <div className={clsx("fixed bottom-0 z-50 w-full p-4", animate)}>
          <div
            role="alert"
            className={clsx("alert", type ? `alert-${type}` : "")}
            onClick={onClick}
          >
            {symbol}
            <span>{message}</span>
          </div>
        </div>
      )}
    </>
  );
}
