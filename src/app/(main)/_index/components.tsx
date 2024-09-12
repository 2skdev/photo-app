"use client";

import { addFollow, deleteFollow } from "@/actions/follow";
import { addLike, deleteLike, getLikeUserCount } from "@/actions/like";
import { deletePost } from "@/actions/post";
import { addSpam } from "@/actions/spam";
import { LogoFB, LogoX } from "@/components/Assets";
import { Dropdown } from "@/components/Dropdown";
import { HashtagText } from "@/components/HashtagText";
import {
  MaterialSymbolsShare,
  MdiCardsHeart,
  MdiCardsHeartOutline,
  MdiChevronRight,
  MdiCommentOutline,
  MdiDotsHorizontal,
  MdiLink,
} from "@/components/Icons";
import { UserAvatar } from "@/components/UserAvatar";
import { BASE_URL } from "@/constants/url";
import { useModal } from "@/providers/ModalProvider";
import { useSnackbar } from "@/providers/SnackbarProvider";
import { Post, SpamTypeType } from "@/types/zod";
import { getDateString } from "@/utils/date";
import { getPublicUrl } from "@/utils/storage";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { getTimelinePosts, TimelinePost } from "./actions";

function DeleteForm({
  onDelete,
  onCancel,
}: {
  onDelete: () => void;
  onCancel: () => void;
}) {
  return (
    <>
      <div className="my-2 text-lg">投稿を削除しますか？</div>
      <div className="text-sm">この操作は取り消せません</div>
      <div className="mt-4 border-t border-neutral pt-2">
        <button
          className="btn btn-ghost btn-block text-error"
          onClick={onDelete}
        >
          削除
        </button>
        <button className="btn btn-ghost btn-block" onClick={onCancel}>
          キャンセル
        </button>
      </div>
    </>
  );
}

function SpamForm({ post, onClose }: { post: Post; onClose: () => void }) {
  const titles: { [key in SpamTypeType]: string } = {
    Spam: "スパム",
    Hate: "中傷または差別的",
    Violent: "暴力的な発言",
    Sensitive: "センシティブなメディア",
    Nude: "ヌードまたは性的行為",
    Privacy: "個人情報の侵害",
    Illegal: "違法なコンテンツ",
  };

  const onClick = async (type: SpamTypeType) => {
    await addSpam({
      userId: "", // set by server action
      type,
      postId: post.id,
    });
    onClose();
  };

  return (
    <div>
      <div className="mb-2 font-bold">報告する問題の種類を教えてください</div>

      {Object.entries(titles).map(([key, value]) => (
        <div
          key={key}
          className="flex h-8 cursor-pointer items-center justify-between px-4 py-6 hover:bg-neutral"
          onClick={() => {
            onClick(key as SpamTypeType);
          }}
        >
          <div>{value}</div>
          <MdiChevronRight />
        </div>
      ))}
    </div>
  );
}

type TimelineItemProps = {
  item: TimelinePost;
};
function TimelineItem(props: TimelineItemProps) {
  const router = useRouter();
  const { open: showSnackbar } = useSnackbar();
  const { open: openModal, close: closeModal } = useModal();

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
                      openModal(
                        <DeleteForm
                          onDelete={async () => {
                            await deletePost(item.post);
                            closeModal();
                            window.location.reload();
                          }}
                          onCancel={closeModal}
                        />,
                      );
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
                        openModal(
                          <SpamForm post={item.post} onClose={closeModal} />,
                        );
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
        <div key={item.post.id}>
          <TimelineItem item={item} />
          <div className="my-4 w-full border-b border-neutral" />
        </div>
      ))}
      <div ref={observerRef} className="flex w-full justify-center">
        {loading && <span className="loading loading-dots"></span>}
      </div>
    </>
  );
}
