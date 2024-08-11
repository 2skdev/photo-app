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
    <div className="btn h-48 flex justify-center items-center space-x-2">
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
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-2">
              <button
                className="btn btn-sm btn-square btn-ghost"
                onClick={() => setTempImage(undefined)}
              >
                <MaterialSymbolsCloseRounded />
              </button>
              <div className="font-bold">画像範囲を選択</div>
            </div>
            <button className="btn btn-sm btn-primary" onClick={onConfirm}>
              適用
            </button>
          </div>
          <div className="relative w-96 h-96">
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
