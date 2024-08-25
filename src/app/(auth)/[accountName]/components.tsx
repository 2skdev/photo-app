"use client";

import { updateFollow } from "@/actions/follow";
import { User } from "@/models/zod";
import { PostImage, UserImage } from "@/models/zodExtension";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function FollowButton(props: { user: User; default: boolean }) {
  const [follow, setFollow] = useState<boolean>(props.default);

  const onClick = async () => {
    await updateFollow(props.user, !follow);
    setFollow(!follow);
  };

  return (
    <button
      className={clsx(
        "btn btn-sm md:btn-md",
        follow ? "btn-primary" : "btn-neutral",
      )}
      onClick={onClick}
    >
      {follow ? "フォロー中" : "フォロー"}
    </button>
  );
}

export function PostGridItem(props: { post: PostImage; user: UserImage }) {
  const router = useRouter();

  return (
    <button
      className="btn aspect-square h-full w-full p-0"
      onClick={() => router.push(`/${props.user.accountName}/${props.post.id}`)}
    >
      <img
        className="h-full w-full rounded-lg object-cover hover:object-scale-down"
        src={props.post.imageSrc}
      ></img>
    </button>
  );
}
