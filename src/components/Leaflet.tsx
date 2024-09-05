"use client";

import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet/dist/leaflet.css";

import { MapContainer, Marker, TileLayer } from "react-leaflet";

type Props = {
  center: [number, number];
  marker?: [number, number];
};

export function Leaflet(props: Props) {
  return (
    <MapContainer
      center={props.center}
      zoom={13}
      className="h-96 w-full rounded"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | © Google'
        // url="https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
        url="https://mt1.google.com/vt/lyrs=r&x={x}&y={y}&z={z}"
      />
      {props.marker && <Marker position={props.marker}></Marker>}
    </MapContainer>
  );
}
