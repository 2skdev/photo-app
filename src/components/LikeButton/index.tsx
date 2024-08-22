"use client";

import { updateLike } from "@/actions/like";
import { Post } from "@/models/zod";
import { useState } from "react";
import { MdiCardsHeart, MdiCardsHeartOutline } from "../icons";

type Props = {
  post: Post;
  default: boolean;
};

export default function LikeButton(props: Props) {
  const [like, setLike] = useState<boolean>(props.default);

  const onClick = async () => {
    await updateLike(props.post, !like);
    setLike(!like);
  };

  return (
    <button onClick={onClick}>
      {like ? <MdiCardsHeart /> : <MdiCardsHeartOutline />}
    </button>
  );
}
