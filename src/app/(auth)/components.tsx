"use client";

import { signOut } from "@/actions/auth";
import { addPost } from "@/actions/post";
import { AlertDialog } from "@/components/AlertDialog";
import {
  MaterialSymbolsAdd,
  MaterialSymbolsArrowBackRounded,
  MaterialSymbolsCloseRounded,
  MaterialSymbolsMoreHoriz,
  MaterialSymbolsOtherHouses,
  MaterialSymbolsPerson,
  MaterialSymbolsSearchRounded,
} from "@/components/Icons";
import { ImagePicker } from "@/components/ImagePicker";
import { Modal } from "@/components/Modal";
import { UserAvatar } from "@/components/UserAvatar";
import {
  PostOptionalInput,
  PostOptionalInputSchema,
  UserImage,
} from "@/models/zodExtension";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, useState } from "react";
import { useForm, useWatch } from "react-hook-form";

export function Sidebar(props: { me: UserImage }) {
  const pathname = usePathname();
  const [show, setShow] = useState(false);

  const items = [
    {
      href: "/",
      label: "ホーム",
      icon: <MaterialSymbolsOtherHouses className="h-6 w-6" />,
    },
    {
      href: "/search",
      label: "検索",
      icon: <MaterialSymbolsSearchRounded className="h-6 w-6" />,
    },
    {
      href: `/${props.me.accountName}`,
      label: "プロフィール",
      icon: <MaterialSymbolsPerson className="h-6 w-6" />,
    },
  ];

  return (
    <div className="sticky top-0 flex h-screen w-80 flex-col border-r border-neutral p-4">
      <div className="mx-4 mb-6 mt-2 flex items-center justify-start">
        <img src="/icon.svg" alt="Icon" width={24} height={24} />
        <div className="ml-2">Photo App</div>
      </div>

      {items.map((item, index) => (
        <Link
          key={index}
          className={clsx(
            "btn btn-block flex justify-start",
            pathname === item.href ? "" : "btn-ghost",
          )}
          href={item.href}
        >
          <div className="flex items-center space-x-3">
            {item.icon}
            <div>{item.label}</div>
          </div>
        </Link>
      ))}

      <button
        className="btn btn-primary btn-block mt-4 rounded-full"
        onClick={() => setShow(true)}
      >
        投稿
      </button>
      <PostFormModal show={show} onRequestClose={() => setShow(false)} />

      <div className="dropdown dropdown-top mt-auto w-full">
        <div
          tabIndex={0}
          role="button"
          className="btn btn-ghost btn-block flex justify-start"
        >
          <UserAvatar src={props.me.iconSrc} className="h-10 w-10" />
          <div className="flex flex-col items-start">
            <div>{props.me.accountName}</div>
            <div className="text-sm font-light">@{props.me.accountName}</div>
          </div>
          <div className="ml-auto">
            <MaterialSymbolsMoreHoriz className="h-6 w-6" />
          </div>
        </div>

        <ul
          tabIndex={0}
          className="menu dropdown-content z-10 mb-2 w-52 rounded-box bg-neutral p-2"
        >
          <li>
            <Link href="/setting">設定</Link>
          </li>
          <li>
            <button onClick={async () => await signOut()}>ログアウト</button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export function Bottombar(props: { me: UserImage }) {
  const pathname = usePathname();
  const [show, setShow] = useState(false);

  const items = [
    {
      href: "/",
      label: "ホーム",
      icon: <MaterialSymbolsOtherHouses className="h-6 w-6" />,
    },
    {
      href: "/search",
      label: "検索",
      icon: <MaterialSymbolsSearchRounded className="h-6 w-6" />,
    },
    {
      href: `/${props.me.accountName}`,
      label: "プロフィール",
      icon: <MaterialSymbolsPerson className="h-6 w-6" />,
    },
  ];

  return (
    <>
      <div className="fixed bottom-0 flex h-14 w-screen items-center justify-around border-t border-neutral bg-base-100">
        {items.map((item, index) => (
          <Link
            key={index}
            className={clsx("btn", pathname === item.href ? "" : "btn-ghost")}
            href={item.href}
          >
            {item.icon}
          </Link>
        ))}
      </div>

      {pathname === "/" && (
        <div className="fixed bottom-20 right-6">
          <button
            className="btn btn-circle btn-primary shadow"
            onClick={() => setShow(true)}
          >
            <MaterialSymbolsAdd className="h-6 w-6" />
          </button>
          <PostFormModal show={show} onRequestClose={() => setShow(false)} />
        </div>
      )}
    </>
  );
}

export function PostFormModal(props: {
  show: boolean;
  onRequestClose?: () => void;
}) {
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

  const image = useWatch({ name: "imageSrc", control });

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
      props.onRequestClose?.();
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
    props.onRequestClose?.();
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
              setValue("imageSrc", base64);
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
      <Modal show={props.show} onRequestClose={onRequestClose}>
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
    </>
  );
}
