"use client";

import { updateFollow } from "@/actions/follow";
import { User } from "@/models/zod";
import clsx from "clsx";
import { useState } from "react";

type Props = {
  user: User;
  default: boolean;
};

export function FollowButton(props: Props) {
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
