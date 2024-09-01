"use client";

import { signOut } from "@/actions/auth";
import { addPost } from "@/actions/post";
import {
  MdiAccount,
  MdiArrowLeft,
  MdiBell,
  MdiClose,
  MdiDotsHorizontal,
  MdiHome,
  MdiMagnify,
  MdiPlus,
} from "@/components/Icons";
import { ImagePicker } from "@/components/ImagePicker";
import { UserAvatar } from "@/components/UserAvatar";
import {
  PostOptionalInput,
  PostOptionalInputSchema,
  UserImage,
} from "@/models/zodExtension";
import { useModal } from "@/providers/ModalProvider";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";

export function Sidebar(props: { me: UserImage }) {
  const pathname = usePathname();
  const { open: openPostForm, close: closePostForm } = useModal();
  const { open: openAlert, close: closeAlert } = useModal();

  const items = [
    {
      href: "/",
      label: "ホーム",
      icon: <MdiHome className="h-6 w-6" />,
    },
    {
      href: "/search",
      label: "検索",
      icon: <MdiMagnify className="h-6 w-6" />,
    },
    {
      href: "/notifications",
      label: "通知",
      icon: <MdiBell className="h-6 w-6" />,
    },
    {
      href: `/${props.me.accountName}`,
      label: "プロフィール",
      icon: <MdiAccount className="h-6 w-6" />,
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

      <PostFormModalButton className="btn btn-primary btn-block mt-4 rounded-full">
        投稿
      </PostFormModalButton>

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
            <MdiDotsHorizontal className="h-6 w-6" />
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
      icon: <MdiHome className="h-6 w-6" />,
    },
    {
      href: "/search",
      label: "検索",
      icon: <MdiMagnify className="h-6 w-6" />,
    },
    {
      href: "/notifications",
      label: "通知",
      icon: <MdiBell className="h-6 w-6" />,
    },
    {
      href: `/${props.me.accountName}`,
      label: "プロフィール",
      icon: <MdiAccount className="h-6 w-6" />,
    },
  ];

  return (
    <>
      <div className="fixed bottom-0 flex h-14 w-screen items-center justify-around border-t border-neutral bg-base-100">
        {items.map((item, index) => (
          <Link
            key={index}
            className={clsx(
              "btn btn-ghost",
              pathname === item.href ? "text-primary" : "",
            )}
            href={item.href}
          >
            {item.icon}
          </Link>
        ))}
      </div>

      {pathname === "/" && (
        <div className="fixed bottom-20 right-6">
          <PostFormModalButton className="btn btn-circle btn-primary shadow">
            <MdiPlus className="h-6 w-6" />
          </PostFormModalButton>
        </div>
      )}
    </>
  );
}

function PostFormContent({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(0);

  const {
    register,
    control,
    getValues,
    setValue,
    formState: { isDirty, dirtyFields },
    reset,
  } = useForm<PostOptionalInput>({
    resolver: zodResolver(PostOptionalInputSchema),
    defaultValues: {
      imageSrc: undefined,
    },
  });
  const image = useWatch({ name: "imageSrc", control });

  useEffect(() => {
    if (step === 0) reset();
  }, [step === 0]);

  const steps = [
    {
      title: "画像を選択",
      canNext: () => {
        return image !== undefined;
      },
      child: (
        <ImagePicker
          onChange={(base64) => {
            if (base64) {
              setValue("imageSrc", base64);
              onNext();
            }
          }}
        />
      ),
    },
    {
      title: "キャプションを入力",
      canNext: () => true,
      child: (
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
    },
  ];

  const onNext = async () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      await addPost(getValues());
      onClose();
    }
  };

  const onPrev = () => {
    if (step > 0) {
      setStep(step - 1);
    } else {
      onClose();
    }
  };

  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <button className="btn btn-square btn-ghost btn-sm" onClick={onPrev}>
          {step === 0 ? <MdiClose /> : <MdiArrowLeft />}
        </button>
        <div className="ml-2 font-bold">{steps[step].title}</div>

        <button
          className="btn btn-primary btn-sm ml-auto"
          disabled={!steps[step].canNext()}
          onClick={onNext}
        >
          {step === steps.length - 1 ? "投稿する" : "次へ"}
        </button>
      </div>
      <div>{steps[step].child}</div>
    </>
  );
}

function PostFormModalButton({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const { open: openForm, close: closeForm } = useModal();
  const { open: openAlert, close: closeAlert } = useModal();

  const onDispose = () => {
    closeAlert();
    closeForm();
  };

  const Alert = () => {
    return (
      <>
        <div className="my-2 text-lg">変更を破棄しますか？</div>
        <div className="text-sm">
          このまま移動すると、編集内容は保存されません
        </div>
        <div className="mt-4 border-t border-neutral pt-2">
          <button
            className="btn btn-ghost btn-block text-error"
            onClick={() => {
              onDispose();
            }}
          >
            破棄
          </button>
          <button className="btn btn-ghost btn-block" onClick={closeAlert}>
            キャンセル
          </button>
        </div>
      </>
    );
  };

  return (
    <button
      className={className}
      onClick={() => {
        openForm(<PostFormContent onClose={onDispose} />, () => {
          openAlert(<Alert />);
          return false;
        });
      }}
    >
      {children}
    </button>
  );
}
