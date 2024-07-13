"use client";
import { Follow, User } from "@prisma/client";
import clsx from "clsx";
import { useState } from "react";
import { updateFollow } from "./actions";

type Props = {
  user: User;
  default: Follow | null;
};

export default function FollowButton(props: Props) {
  const [follow, setFollow] = useState<Follow | null>(props.default);

  const isFollow = () => (follow ? follow.deleted_at === null : false);

  const onClick = async () => {
    setFollow(await updateFollow(props.user.id, !isFollow()));
  };

  return (
    <button
      className={clsx("btn", isFollow() ? "btn-primary" : "btn-neutral")}
      onClick={onClick}
    >
      {isFollow() ? "フォロー中" : "フォロー"}
    </button>
  );
}
