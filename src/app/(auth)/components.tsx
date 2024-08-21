"use client";

import { AlertDialog } from "@/components/AlertDialog";
import {
  MaterialSymbolsArrowBackRounded,
  MaterialSymbolsCloseRounded,
} from "@/components/icons";
import ImagePicker from "@/components/ImagePicker";
import Modal from "@/components/Modal";
import {
  PostOptionalInput,
  PostOptionalInputSchema,
} from "@/types/zodExtension";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { addPost, signOut } from "./actions";

export function SidebarLink({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon: ReactNode;
}) {
  "use client";
  const pathname = usePathname();

  return (
    <Link
      className={clsx(
        "btn btn-block flex justify-start",
        pathname == href ? "btn-neutral" : "btn-ghost",
      )}
      href={href}
    >
      <div className="flex items-center space-x-3">
        {icon}
        <div>{label}</div>
      </div>
    </Link>
  );
}

export function LogoutButton() {
  return <button onClick={async () => await signOut()}>ログアウト</button>;
}

export function PostModalButton() {
  const [modal, setModal] = useState(false);
  const [alert, setAlert] = useState(false);
  const [step, setStep] = useState(0);

  const {
    register,
    control,
    getValues,
    setValue,
    formState: { isDirty },
    reset,
  } = useForm<PostOptionalInput>({
    resolver: zodResolver(PostOptionalInputSchema),
  });

  const image = useWatch({ name: "image_src", control });

  const onRequestClose = () => {
    if (isDirty) {
      // TODO: dirty when step = 0, need default value
      setAlert(true);
    } else {
      onDispose();
    }
  };

  const onPrev = () => {
    if (step > 0) {
      if (step === 1) {
        reset();
      }
      setStep(step - 1);
    } else {
      setModal(false);
    }
  };

  const onNext = async () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      await onSubmit(getValues());
      onDispose();
    }
  };

  const onDispose = () => {
    setAlert(false);
    setModal(false);
    setStep(0);
    reset();
  };

  const onSubmit = async (data: PostOptionalInput) => {
    await addPost(data);
  };

  const steps: Array<{
    title: string;
    node: ReactNode;
    nextValidation: () => boolean;
  }> = [
    {
      title: "画像を選択",
      node: (
        <ImagePicker
          onChange={(base64) => {
            if (base64) {
              setValue("image_src", base64);
              onNext();
            }
          }}
        />
      ),
      nextValidation: () => {
        return image !== undefined;
      },
    },
    {
      title: "キャプションを入力",
      node: (
        <div className="grid max-w-screen-md grid-cols-3">
          <img src={image} className="col-span-2 w-full"></img>
          <div className="ml-4 border-l border-neutral pl-4">
            <input
              {...register("caption", {
                required: true,
              })}
              className="input input-bordered w-full"
              placeholder="タイトル"
            ></input>

            <textarea
              rows={4}
              className="textarea textarea-bordered mt-4 w-full resize-none"
              placeholder="説明"
            ></textarea>
          </div>
        </div>
      ),
      nextValidation: () => {
        return true;
      },
    },
  ];

  return (
    <>
      <Modal show={modal} onRequestClose={onRequestClose} className="p-4">
        <div className="mb-4 flex items-center justify-between">
          <button className="btn btn-square btn-ghost btn-sm" onClick={onPrev}>
            {step === 0 ? (
              <MaterialSymbolsCloseRounded />
            ) : (
              <MaterialSymbolsArrowBackRounded />
            )}
          </button>
          <div className="ml-2 font-bold">{steps[step].title}</div>

          <button
            className="btn btn-primary btn-sm ml-auto"
            disabled={!steps[step].nextValidation()}
            onClick={onNext}
          >
            {step === steps.length - 1 ? "投稿する" : "次へ"}
          </button>
        </div>
        <div className="relative min-w-96">{steps[step].node}</div>
      </Modal>

      <AlertDialog
        show={alert}
        title="変更を破棄しますか？"
        subtitle="このまま移動すると、編集内容は保存されません"
        confirmLabel="破棄"
        onConfirm={onDispose}
        onCancel={() => setAlert(false)}
      />

      <button
        className="btn btn-primary btn-block mt-4 rounded-full"
        onClick={() => setModal(true)}
      >
        投稿
      </button>
    </>
  );
}
