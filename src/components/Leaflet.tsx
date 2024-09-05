"use client";

import clsx from "clsx";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";

type Props = {
  className?: string;
  center: [number, number];
  marker?: [number, number];
};

function MapEvent(props: Props) {
  const map = useMap();

  useEffect(() => {
    const center = map.getCenter();
    if (center.lat !== props.center[0] || center.lng !== props.center[1]) {
      map.flyTo(props.center, undefined, {
        duration: 1,
      });
    }
  }, [props.center]);

  return <></>;
}

export function Leaflet(props: Props) {
  return (
    <MapContainer
      center={props.center}
      zoom={13}
      className={clsx("h-56 w-full rounded md:h-96", props.className)}
      zoomControl={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | © Google'
        // url="https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
        url="https://mt1.google.com/vt/lyrs=r&x={x}&y={y}&z={z}"
      />
      {props.marker && <Marker position={props.marker}></Marker>}

      <MapEvent {...props} />
    </MapContainer>
  );
}
