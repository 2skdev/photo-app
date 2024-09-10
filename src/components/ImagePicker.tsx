"use client";

import { useModal } from "@/providers/ModalProvider";
import imageCompression from "browser-image-compression";
import { ChangeEvent, ReactNode, useState } from "react";
import { MdiClose, MdiImageOutline } from "./Icons";
import { ImageCrop } from "./ImageCrop";

type Props = {
  picker?: ReactNode;
  crop?: boolean;
  onChange?: (base64?: string) => void;
};

async function file2base64(file: File): Promise<string> {
  return new Promise(async (resolve, reject) => {
    const reader = new FileReader();

    const compressed = await imageCompression(file, {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
      preserveExif: true,
    });

    reader.onloadend = () => {
      if (reader.result) {
        resolve(reader.result as string);
      } else {
        reject();
      }
    };
    reader.readAsDataURL(compressed);
  });
}

function ImageCropContent(props: {
  base64: string;
  onConfirm?: (base64?: string) => void;
  onCancel: () => void;
}) {
  const [base64, setBase64] = useState<string>();

  const onConfirm = () => {
    if (base64) {
      props.onConfirm?.(base64);
    }
  };

  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <button
          className="btn btn-square btn-ghost btn-sm"
          onClick={props.onCancel}
        >
          <MdiClose />
        </button>

        <div className="ml-2 font-bold">画像範囲を選択</div>

        <button className="btn btn-primary btn-sm ml-auto" onClick={onConfirm}>
          適用
        </button>
      </div>
      <div className="relative h-full w-full md:h-96 md:w-96">
        <ImageCrop src={props.base64} onCrop={setBase64} />
      </div>
    </>
  );
}

export function ImagePicker(props: Props) {
  const { open, close } = useModal();

  const picker = props.picker ?? (
    <div className="btn flex h-48 min-w-64 items-center justify-center">
      <MdiImageOutline className="h-6 w-6" />
      <div>写真を選択</div>
    </div>
  );

  const onChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const img = await file2base64(file);

      if (props.crop) {
        open(
          <ImageCropContent
            base64={img}
            onCancel={close}
            onConfirm={(base64) => {
              props.onChange?.(base64);
              close();
            }}
          />,
        );
      } else {
        props.onChange?.(img);
      }
    }
    e.target.value = "";
  };

  return (
    <>
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
