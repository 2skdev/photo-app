"use client";

import { updateLike } from "@/actions/like";
import { Post } from "@/types/zod";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";

type Props = {
  post: Post;
  default: boolean;
};

export function LikeButton(props: Props) {
  const [like, setLike] = useState<boolean>(props.default);

  const onClick = async () => {
    await updateLike(props.post, !like);
    setLike(!like);
  };

  return (
    <button onClick={onClick}>
      {like ? (
        <Icon icon="mdi:cards-heart" />
      ) : (
        <Icon icon="mdi:cards-heart-outline" />
      )}
    </button>
  );
}
