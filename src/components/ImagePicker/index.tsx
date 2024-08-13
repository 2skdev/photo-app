"use client";

import { file2base64 } from "@/utils/image";
import { ChangeEvent, ReactNode, useState } from "react";
import { MaterialSymbolsCloseRounded } from "../icons";
import ImageCrop from "../ImageCrop";
import Modal from "../Modal";

type Props = {
  picker?: ReactNode;
  onChange?: (base64?: string) => void;
};

export default function ImagePicker2(props: Props) {
  const [tempImage, setTempImage] = useState<string>();
  const [cropImage, setCropImage] = useState<string>();

  const picker = props.picker ?? (
    <div className="btn flex h-48 items-center justify-center space-x-2">
      <div>写真を選択</div>
    </div>
  );

  const onChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setTempImage(await file2base64(file));
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
        <Modal show={tempImage !== undefined} className="p-4">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <button
                className="btn btn-square btn-ghost btn-sm"
                onClick={() => setTempImage(undefined)}
              >
                <MaterialSymbolsCloseRounded />
              </button>
              <div className="font-bold">画像範囲を選択</div>
            </div>
            <button className="btn btn-primary btn-sm" onClick={onConfirm}>
              適用
            </button>
          </div>
          <div className="relative h-96 w-96">
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
