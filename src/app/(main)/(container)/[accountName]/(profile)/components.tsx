"use client";

import { updateFollow } from "@/actions/follow";
import { Post, User } from "@/types/zod";
import { getPublicUrl } from "@/utils/storage";
import clsx from "clsx";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export function ProfileNavBar({ user }: { user: User }) {
  const pathname = usePathname();

  return (
    <div className="my-1 grid grid-cols-3 gap-2">
      <Link
        className={clsx(
          "flex cursor-pointer justify-center border-primary py-2 hover:bg-neutral",
          pathname === `/${user.accountName}` ? "border-b-2" : "",
        )}
        href={`/${user.accountName}`}
      >
        投稿
      </Link>
      <Link
        className={clsx(
          "flex cursor-pointer justify-center border-primary py-2 hover:bg-neutral",
          pathname === `/${user.accountName}/spot` ? "border-b-2" : "",
        )}
        href={`/${user.accountName}/spot`}
      >
        スポット
      </Link>
      <Link
        className={clsx(
          "flex cursor-pointer justify-center border-primary py-2 hover:bg-neutral",
          pathname === `/${user.accountName}/device` ? "border-b-2" : "",
        )}
        href={`/${user.accountName}/device`}
      >
        デバイス
      </Link>
    </div>
  );
}

export function FollowButton(props: {
  user: User;
  default: boolean;
  className?: string;
}) {
  const [follow, setFollow] = useState<boolean>(props.default);

  const onClick = async () => {
    await updateFollow(props.user, !follow);
    setFollow(!follow);
  };

  return (
    <button
      className={clsx(
        "btn",
        follow ? "btn-primary" : "btn-neutral",
        props.className,
      )}
      onClick={onClick}
    >
      {follow ? "フォロー中" : "フォロー"}
    </button>
  );
}

export function PostGridItem(props: { post: Post; user: User }) {
  const router = useRouter();

  return (
    <button
      className="btn aspect-square h-full w-full p-0"
      onClick={() => router.push(`/${props.user.accountName}/${props.post.id}`)}
    >
      <img
        className="h-full w-full rounded-lg object-cover hover:object-scale-down"
        src={getPublicUrl("Post", props.post.imagePath)!}
      ></img>
    </button>
  );
}
