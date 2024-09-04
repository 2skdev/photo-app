"use client";

import "mapbox-gl/dist/mapbox-gl.css";

import { useMedia } from "@/providers/MediaProvider";
import { useCurrentTheme } from "@/providers/ThemeProvider";
import MapboxLanguage from "@mapbox/mapbox-gl-language";
import mapboxgl from "mapbox-gl";
import { useEffect, useState } from "react";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN ?? "";

type Props = {
  center: [number, number];
  marker?: [number, number];
};

export function Map(props: Props) {
  const [map, setMap] = useState<mapboxgl.Map>();
  const currentTheme = useCurrentTheme();
  const { type } = useMedia();

  useEffect(() => {
    if (!map) {
      const map = new mapboxgl.Map({
        container: "map",
        style: `mapbox://styles/mapbox/${currentTheme}-v11`,
        center: props.center,
        zoom: 15,
      });
      map.addControl(new MapboxLanguage({ defaultLanguage: "ja" }));

      if (props.marker) {
        new mapboxgl.Marker().setLngLat(props.marker).addTo(map);
      }

      setMap(map);
    }
  }, [map]);

  useEffect(() => {
    if (map) map.resize();
  }, [type]);

  return (
    <div id="map" className="absolute inset-0 h-56 w-full rounded md:h-96" />
  );
}
