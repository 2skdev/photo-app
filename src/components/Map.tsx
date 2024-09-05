"use client";

import dynamic from "next/dynamic";

type Props = {
  className?: string;
  center: [number, number];
  marker?: [number, number];
};

const Leaflet = dynamic(
  () => import("@/components/Leaflet").then((module) => module.Leaflet),
  {
    ssr: false,
  },
);

export function Map(props: Props) {
  return <Leaflet {...props} />;
}
