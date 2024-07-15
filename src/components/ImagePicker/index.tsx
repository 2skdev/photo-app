"use client";

import { ChangeEvent, ReactNode, useState } from "react";

type Props = {
  picker?: ReactNode;
  onChange?: (base64?: string) => void;
};

function url2base64(file: File): Promise<string> {
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

export default function ImagePicker(props: Props) {
  const [base64, setBase64] = useState<string>();

  const picker = props.picker ?? (
    <div className="btn h-48 flex justify-center items-center space-x-2">
      <div>写真を選択</div>
    </div>
  );

  const onChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const base64 = await url2base64(file);
      setBase64(base64);

      props.onChange?.(base64);
    }
  };

  return (
    <>
      <label>
        {base64 === undefined ? (
          picker
        ) : (
          <img className="hover:cursor-pointer" src={base64}></img>
        )}

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
