"use client";

import { useState } from "react";
import Cropper, { Area, Point } from "react-easy-crop";

type Props = {
  src: string;
  onCrop?: (base64: string) => void;
};

async function cropImage(base64: string, crop: Area): Promise<string | null> {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    return null;
  }

  const image = await new Promise<HTMLImageElement>((resolve) => {
    const image = new Image();

    image.onload = () => {
      resolve(image);
    };

    image.src = base64;
  });

  canvas.width = image.width;
  canvas.height = image.height;
  ctx.drawImage(image, 0, 0);

  const data = ctx.getImageData(crop.x, crop.y, crop.width, crop.height);
  canvas.width = crop.width;
  canvas.height = crop.height;
  ctx.putImageData(data, 0, 0);

  return canvas.toDataURL("image/jpeg");
}

export function ImageCrop(props: Props) {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState<number>(1);

  const onCrop = async (area: Area) => {
    const dst = await cropImage(props.src, area);
    if (dst) {
      props.onCrop?.(dst);
    }
  };

  return (
    <Cropper
      image={props.src}
      aspect={1}
      crop={crop}
      onCropChange={setCrop}
      zoom={zoom}
      onZoomChange={setZoom}
      onCropComplete={(_, areaPixel) => onCrop(areaPixel)}
    ></Cropper>
  );
}
