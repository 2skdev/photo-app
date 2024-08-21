"use client";

import { Post, User } from "@prisma/client";
import { notFound, useRouter } from "next/navigation";
import UserAvatar from "../UserAvatar";
import {
  MaterialSymbolsModeCommentOutline,
  MaterialSymbolsShare,
  MdiCardsHeartOutline,
} from "../icons";

type Props = {
  post: Post;
  postImageSrc: string | null;
  user: User;
  userIconSrc: string | null;
};

function getDateString(date: Date): string {
  const now = new Date();

  const diff = now.getTime() - date.getTime();

  if (diff < 60 * 1000) {
    return "たった今";
  } else if (diff < 60 * 60 * 1000) {
    return `${Math.floor(diff / (60 * 1000))}分前`;
  } else if (diff < 24 * 60 * 60 * 1000) {
    return `${Math.floor(diff / (60 * 60 * 1000))}時間前`;
  } else if (diff < 7 * 24 * 60 * 60 * 1000) {
    return `${Math.floor(diff / (24 * 60 * 60 * 1000))}日前`;
  } else {
    return date.toLocaleDateString();
  }
}

export default function PostItem(props: Props) {
  const router = useRouter();

  if (!props.postImageSrc) {
    notFound();
  }

  return (
    <>
      <div className="flex items-center">
        <div
          className="flex items-center hover:cursor-pointer"
          onClick={() => {
            router.push(`/${props.user.account_name}`);
          }}
        >
          <UserAvatar src={props.userIconSrc} className="h-10 w-10" />
          <div className="ml-4">{props.user.display_name}</div>
          <div className="ml-2 font-light">@{props.user.account_name}</div>
        </div>
        <div className="ml-2 pt-1 text-sm font-light">
          • {getDateString(props.post.created_at)}
        </div>
      </div>

      <div className="mt-2 flex w-full justify-center rounded-sm bg-black hover:cursor-pointer">
        <img
          src={props.postImageSrc}
          className="rounded-sm"
          onClick={() =>
            router.push(`/${props.user.account_name}/${props.post.id}`)
          }
        />
      </div>

      <div className="mt-2 flex space-x-2">
        <MdiCardsHeartOutline className="h-6 w-6" />
        <MaterialSymbolsModeCommentOutline className="h-6 w-6" />
        <MaterialSymbolsShare className="h-6 w-6" />
      </div>

      <div className="mt-2">
        <div className="font-light">{props.post.caption}</div>
      </div>
    </>
  );
}
