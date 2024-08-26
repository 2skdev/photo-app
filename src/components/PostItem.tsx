"use client";

import { updateFollow } from "@/actions/follow";
import { deletePost } from "@/actions/post";
import { User } from "@/models/zod";
import { PostImage, UserImage } from "@/models/zodExtension";
import { useSnackbarContext } from "@/providers/SnackbarProvider";
import { getDateString } from "@/utils/date";
import { notFound, useRouter } from "next/navigation";
import { useState } from "react";
import { Dropdown } from "./Dropdown";
import {
  MaterialSymbolsModeCommentOutline,
  MaterialSymbolsMoreHoriz,
  MaterialSymbolsShare,
  MdiCardsHeartOutline,
} from "./Icons";
import { UserAvatar } from "./UserAvatar";

type Props = {
  post: PostImage;
  user: UserImage;
  me: User;
  follow: boolean;
};

export function PostItem(props: Props) {
  const router = useRouter();
  const [follow, _setFollow] = useState(props.follow);

  const { showSnackbar } = useSnackbarContext();

  if (!props.post.imageSrc) {
    notFound();
  }

  const setFollow = (state: boolean) => {
    _setFollow(state);
    updateFollow(props.user, state);
  };

  return (
    <>
      <div className="flex items-center">
        <div
          className="flex cursor-pointer items-center"
          onClick={() => {
            router.push(`/${props.user.accountName}`);
          }}
        >
          <UserAvatar src={props.user.iconSrc} className="h-10 w-10" />
          <div className="ml-2">{props.user.displayName}</div>
          <div className="ml-1 text-sm font-light">
            @{props.user.accountName}
          </div>
        </div>
        <div className="ml-2 pt-1 text-sm font-light">
          • {getDateString(props.post.createdAt)}
        </div>

        <Dropdown
          className="dropdown-end ml-auto"
          button={<MaterialSymbolsMoreHoriz className="h-6 w-6" />}
          list={
            <>
              <li>
                <a
                  onClick={() => {
                    showSnackbar("success", "リンクをコピーしました");
                  }}
                >
                  リンクをコピー
                </a>
              </li>
              {props.post.userId === props.me.id && (
                <li>
                  <a
                    className="text-error"
                    onClick={() => {
                      // todo: confirm dialog
                      deletePost(props.post);
                    }}
                  >
                    投稿を削除
                  </a>
                </li>
              )}
              {props.post.userId !== props.me.id && (
                <>
                  <li>
                    <a
                      onClick={() => setFollow(!follow)}
                      className={follow ? "text-error" : ""}
                    >
                      {follow
                        ? "フォローをやめる"
                        : `@${props.user.accountName}さんをフォロー`}
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-error"
                      onClick={() => {
                        throw new Error("Not implemented");
                      }}
                    >
                      報告する
                    </a>
                  </li>
                </>
              )}
            </>
          }
        />
      </div>

      <div className="mt-2 flex w-full cursor-pointer justify-center rounded-sm bg-black">
        <img
          src={props.post.imageSrc}
          className="rounded-sm"
          onClick={() =>
            router.push(`/${props.user.accountName}/${props.post.id}`)
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
