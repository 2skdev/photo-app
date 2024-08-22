"use client";

import { updateFollow } from "@/actions/follow";
import { Follow, User } from "@/models/zod";
import clsx from "clsx";
import { useState } from "react";

type Props = {
  user: User;
  default: Follow | null;
};

export function FollowButton(props: Props) {
  const [follow, setFollow] = useState<Follow | null>(props.default);

  const isFollow = () => (follow ? follow.deleted_at === null : false);

  const onClick = async () => {
    setFollow(await updateFollow(props.user.id, !isFollow()));
  };

  return (
    <button
      className={clsx(
        "btn btn-sm md:btn-md",
        isFollow() ? "btn-primary" : "btn-neutral",
      )}
      onClick={onClick}
    >
      {isFollow() ? "フォロー中" : "フォロー"}
    </button>
  );
}
