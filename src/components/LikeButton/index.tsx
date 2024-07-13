"use client";

import { Like, Post } from "@prisma/client";
import { useState } from "react";
import { MdiCardsHeart, MdiCardsHeartOutline } from "../icons";
import { updateLike } from "./actions";

type Props = {
  post: Post;
  default: Like | null;
};

export default function LikeButton(props: Props) {
  const [like, setLike] = useState<Like | null>(props.default);

  const isLike = () => (like ? like.deleted_at === null : false);

  const onClick = async () => {
    setLike(await updateLike(props.post.id, !isLike()));
  };

  return (
    <button onClick={onClick}>
      {isLike() ? <MdiCardsHeart /> : <MdiCardsHeartOutline />}
    </button>
  );
}
