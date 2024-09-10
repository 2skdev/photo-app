"use client";

import { updateFollow } from "@/actions/follow";
import { updateLike } from "@/actions/like";
import { deletePost } from "@/actions/post";
import { BASE_URL } from "@/constants/url";
import { User } from "@/models/zod";
import { PostImage, UserImage } from "@/models/zodExtension";
import { useSnackbar } from "@/providers/SnackbarProvider";
import { getDateString } from "@/utils/date";
import { notFound, useRouter } from "next/navigation";
import { useState } from "react";
import { LogoFB, LogoX } from "./Assets";
import { Dropdown } from "./Dropdown";
import { HashtagText } from "./HashtagText";
import {
  MaterialSymbolsShare,
  MdiCardsHeart,
  MdiCardsHeartOutline,
  MdiCommentOutline,
  MdiDotsHorizontal,
  MdiLink,
} from "./Icons";
import { UserAvatar } from "./UserAvatar";

type Props = {
  post: PostImage;
  user: UserImage;
  me: User;
  follow: boolean;
  like: boolean;
  likeCount: number;
};

export function PostItem(props: Props) {
  const router = useRouter();
  const [follow, _setFollow] = useState(props.follow);
  const [like, _setLike] = useState(props.like);

  const { open: showSnackbar } = useSnackbar();

  if (!props.post.imageSrc) {
    notFound();
  }

  const setFollow = (state: boolean) => {
    _setFollow(state);
    updateFollow(props.user, state);
  };

  const setLike = (state: boolean) => {
    _setLike(state);
    updateLike(props.post, state);
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
          button={
            <MdiDotsHorizontal className="h-6 w-6 cursor-pointer hover:opacity-80" />
          }
          list={
            <div className="w-72">
              <li>
                <a
                  onClick={() => {
                    navigator.clipboard.writeText(
                      `${BASE_URL}/${props.user.accountName}/${props.post.id}`,
                    );
                    showSnackbar("リンクをコピーしました", "success");
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
            </div>
          }
        />
      </div>

      <div className="mt-2 flex w-full cursor-pointer justify-center rounded bg-black">
        <img
          src={props.post.imageSrc}
          className="rounded"
          onClick={() =>
            router.push(`/${props.user.accountName}/${props.post.id}`)
          }
        />
      </div>

      <div className="mt-4 flex items-center space-x-4">
        <div
          className="flex w-10 cursor-pointer items-center hover:opacity-80"
          onClick={() => setLike(!like)}
        >
          {like ? (
            <MdiCardsHeart className="h-6 w-6 fill-red-500" />
          ) : (
            <MdiCardsHeartOutline className="h-6 w-6" />
          )}
          <div className="ml-1 text-sm">
            {props.likeCount - (props.like ? 1 : 0) + (like ? 1 : 0)}
          </div>
        </div>
        <div className="flex w-10 cursor-pointer items-center hover:opacity-80">
          <MdiCommentOutline className="h-6 w-6" />
          <div className="ml-1 text-sm">0</div>
        </div>
        <div className="flex cursor-pointer items-center hover:opacity-80">
          <Dropdown
            className="dropdown-top ml-auto"
            button={<MaterialSymbolsShare className="h-6 w-6" />}
            list={
              <div className="w-48">
                <li>
                  <a
                    onClick={() => {
                      navigator.clipboard.writeText(
                        `${BASE_URL}/${props.user.accountName}/${props.post.id}`,
                      );
                      showSnackbar("リンクをコピーしました", "success");
                    }}
                  >
                    <MdiLink className="h-4 w-4 fill-base-content" />
                    リンクをコピー
                  </a>
                </li>
                <li>
                  <a
                    href={`http://x.com/share?url=${BASE_URL}/${props.user.accountName}/${props.post.id}&text=${props.post.text}&via=${props.user.accountName}`}
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                  >
                    <LogoX className="h-4 w-4 fill-base-content" />
                    <div>Xでシェア</div>
                  </a>
                </li>
                <li>
                  <a
                    href={`http://www.facebook.com/share.php?u=yurukei-career.com?u=${BASE_URL}/${props.user.accountName}/${props.post.id}`}
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                  >
                    <LogoFB className="h-4 w-4 fill-base-content" />
                    <div>Facebookでシェア</div>
                  </a>
                </li>
              </div>
            }
          />
        </div>
      </div>

      <div className="mt-2">
        <div className="whitespace-pre-wrap font-light">
          <HashtagText
            text={props.post.text}
            onClick={(tag) => {
              router.push(`/search?q=${encodeURIComponent(tag)}`);
            }}
          />
        </div>
      </div>
    </>
  );
}
