"use client";

import { addFollow, deleteFollow } from "@/actions/follow";
import { addLike, deleteLike, getLikeUserCount } from "@/actions/like";
import { deletePost } from "@/actions/post";
import { LogoFB, LogoX } from "@/components/Assets";
import { Dropdown } from "@/components/Dropdown";
import { HashtagText } from "@/components/HashtagText";
import {
  MaterialSymbolsShare,
  MdiCardsHeart,
  MdiCardsHeartOutline,
  MdiCommentOutline,
  MdiDotsHorizontal,
  MdiLink,
} from "@/components/Icons";
import { UserAvatar } from "@/components/UserAvatar";
import { BASE_URL } from "@/constants/url";
import { useSnackbar } from "@/providers/SnackbarProvider";
import { getDateString } from "@/utils/date";
import { getPublicUrl } from "@/utils/storage";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { getTimelinePosts, TimelinePost } from "./actions";

type TimelineItemProps = {
  item: TimelinePost;
};
function TimelineItem(props: TimelineItemProps) {
  const router = useRouter();
  const { open: showSnackbar } = useSnackbar();

  const [item, setItem] = useState(props.item);

  const toggleFollow = async () => {
    let newItem = { ...item };

    if (item.follow) {
      await deleteFollow(item.user);
      newItem.follow = null;
    } else {
      newItem.follow = await addFollow(item.user);
    }

    // todo: apply ui before update state
    setItem(newItem);
  };

  const toggleLike = async () => {
    let newItem = { ...item };

    if (item.like) {
      await deleteLike(item.post);
      newItem.like = null;
    } else {
      newItem.like = await addLike(item.post);
    }

    // todo: apply ui before update state
    newItem.count.like = await getLikeUserCount(item.post);
    setItem(newItem);
  };

  return (
    <>
      <div className="flex items-center">
        <div
          className="flex cursor-pointer items-center"
          onClick={() => {
            router.push(`/${item.user.accountName}`);
          }}
        >
          <UserAvatar
            src={getPublicUrl("User", item.user.iconPath)}
            className="h-10 w-10"
          />
          <div className="ml-2">{item.user.displayName}</div>
          <div className="ml-1 text-sm font-light">
            @{item.user.accountName}
          </div>
        </div>
        <div className="ml-2 pt-1 text-sm font-light">
          • {getDateString(item.post.createdAt)}
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
                      `${BASE_URL}/${item.user.accountName}/${item.post.id}`,
                    );
                    showSnackbar("リンクをコピーしました", "success");
                  }}
                >
                  リンクをコピー
                </a>
              </li>
              {item.post.userId === item.me.id && (
                <li>
                  <a
                    className="text-error"
                    onClick={() => {
                      // todo: confirm dialog
                      deletePost(item.post);
                    }}
                  >
                    投稿を削除
                  </a>
                </li>
              )}
              {item.post.userId !== item.me.id && (
                <>
                  <li>
                    <a
                      onClick={toggleFollow}
                      className={item.follow ? "text-error" : ""}
                    >
                      {item.follow
                        ? "フォローをやめる"
                        : `@${item.user.accountName}さんをフォロー`}
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
          src={getPublicUrl("Post", item.post.imagePath)!}
          className="rounded"
          onClick={() =>
            router.push(`/${item.user.accountName}/${item.post.id}`)
          }
        />
      </div>

      <div className="mt-4 flex items-center space-x-4">
        <div
          className="flex w-10 cursor-pointer items-center hover:opacity-80"
          onClick={toggleLike}
        >
          {item.like ? (
            <MdiCardsHeart className="h-6 w-6 fill-red-500" />
          ) : (
            <MdiCardsHeartOutline className="h-6 w-6" />
          )}
          <div className="ml-1 text-sm">{item.count.like}</div>
        </div>
        <div className="flex w-10 cursor-pointer items-center hover:opacity-80">
          <MdiCommentOutline className="h-6 w-6" />
          <div className="ml-1 text-sm">{item.count.comment}</div>
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
                        `${BASE_URL}/${item.user.accountName}/${item.post.id}`,
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
                    href={`http://x.com/share?url=${BASE_URL}/${item.user.accountName}/${item.post.id}&text=${item.post.text}&via=${item.user.accountName}`}
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                  >
                    <LogoX className="h-4 w-4 fill-base-content" />
                    <div>Xでシェア</div>
                  </a>
                </li>
                <li>
                  <a
                    href={`http://www.facebook.com/share.php?u=yurukei-career.com?u=${BASE_URL}/${item.user.accountName}/${item.post.id}`}
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
            text={item.post.text}
            onClick={(tag) => {
              router.push(`/search?q=${encodeURIComponent(tag)}`);
            }}
          />
        </div>
      </div>
    </>
  );
}

type TimelineProps = {
  default: Array<TimelinePost>;
};
export function Timeline(props: TimelineProps) {
  const [items, setItems] = useState<Array<TimelinePost>>(props.default);
  const [loading, setLoading] = useState(false);
  const observerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setLoading(true);
          getTimelinePosts(items.length).then((newItems) => {
            setItems([...items, ...newItems]);
            setLoading(false);
          });
        }
      },
      { threshold: 1 },
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, []);

  return (
    <>
      {items.map((item) => (
        <>
          <TimelineItem key={item.post.id} item={item} />
          <div className="my-4 w-full border-b border-neutral" />
        </>
      ))}
      <div ref={observerRef} className="flex w-full justify-center">
        {loading && <span className="loading loading-dots"></span>}
      </div>
    </>
  );
}
