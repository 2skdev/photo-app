"use client";

import { ChangeEvent, ReactNode, useState } from "react";
import {
  MaterialSymbolsCloseRounded,
  MaterialSymbolsImagesmodeOutline,
} from "./Icons";
import { ImageCrop } from "./ImageCrop";
import { Modal } from "./Modal";

type Props = {
  picker?: ReactNode;
  crop?: boolean;
  onChange?: (base64?: string) => void;
};

async function file2base64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      if (reader.result) {
        resolve(reader.result as string);
      } else {
        reject();
      }
    };
    reader.readAsDataURL(file);
  });
}

export function ImagePicker(props: Props) {
  const [tempImage, setTempImage] = useState<string>();
  const [cropImage, setCropImage] = useState<string>();

  const picker = props.picker ?? (
    <div className="btn flex h-48 items-center justify-center">
      <MaterialSymbolsImagesmodeOutline className="h-6 w-6" />
      <div>写真を選択</div>
    </div>
  );

  const onChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const img = await file2base64(file);
      if (props.crop) {
        if (file) {
          setTempImage(img);
        }
      } else {
        props.onChange?.(img);
      }
    }
    e.target.value = "";
  };

  const onConfirm = () => {
    setTempImage(undefined);
    if (cropImage) {
      props.onChange?.(cropImage);
    }
  };

  return (
    <>
      {tempImage && (
        <Modal show={tempImage !== undefined}>
          <div className="mb-4 flex items-center justify-between">
            <button
              className="btn btn-square btn-ghost btn-sm"
              onClick={() => setTempImage(undefined)}
            >
              <MaterialSymbolsCloseRounded />
            </button>

            <div className="ml-2 font-bold">画像範囲を選択</div>

            <button
              className="btn btn-primary btn-sm ml-auto"
              onClick={onConfirm}
            >
              適用
            </button>
          </div>
          <div className="relative h-full w-full md:h-96 md:w-96">
            <ImageCrop src={tempImage} onCrop={setCropImage} />
          </div>
        </Modal>
      )}

      <label>
        {picker}

        <input
          type="file"
          accept="image/jpeg, image/png"
          hidden
          onChange={onChange}
        />
      </label>
    </>
  );
}