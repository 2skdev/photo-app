"use client";

import {
  MdiAccountPlus,
  MdiCardsHeart,
  MdiCommentOutline,
} from "@/components/Icons";
import { UserAvatar } from "@/components/UserAvatar";
import { Comment, Post, User } from "@/types/zod";
import { getPublicUrl } from "@/utils/storage";
import Link from "next/link";

export function CommentNotification({
  me,
  user,
  post,
  comment,
}: {
  me: User;
  user: User;
  post: Post;
  comment: Comment;
}) {
  return (
    <Link href={`/${me.accountName}/${post.id}`}>
      <div className="flex w-full cursor-pointer flex-row items-center border-b border-neutral px-2 py-2 hover:bg-neutral">
        <MdiCommentOutline className="h-6 w-6" />
        <div className="ml-4 flex min-h-12 flex-col justify-center">
          <div className="flex items-center">
            <UserAvatar
              src={getPublicUrl("User", user.iconPath)}
              className="h-6 w-6"
            />
            <div className="ml-2">{user.displayName}さんがコメントしました</div>
          </div>
          {comment.text && (
            <div className="mt-1 text-sm font-light">{comment.text}</div>
          )}
        </div>
        <img
          className="ml-auto h-12 w-12 rounded-lg"
          src={getPublicUrl("Post", post.imagePath)!}
        />
      </div>
    </Link>
  );
}

export function LikeNotification({
  me,
  user,
  post,
}: {
  me: User;
  user: User;
  post: Post;
}) {
  return (
    <Link href={`/${me.accountName}/${post.id}`}>
      <div className="flex w-full cursor-pointer flex-row items-center border-b border-neutral px-2 py-2 hover:bg-neutral">
        <MdiCardsHeart className="h-6 w-6 fill-red-500" />
        <div className="ml-4 flex min-h-12 flex-col justify-center">
          <div className="flex items-center">
            <UserAvatar
              src={getPublicUrl("User", user.iconPath)}
              className="h-6 w-6"
            />
            <div className="ml-2">{user.displayName}さんがいいねしました</div>
          </div>
          {post.text && (
            <div className="mt-1 text-sm font-light">{post.text}</div>
          )}
        </div>
        <img
          className="ml-auto h-12 w-12 rounded-lg"
          src={getPublicUrl("Post", post.imagePath)!}
        />
      </div>
    </Link>
  );
}

export function FollowNotification({ me, user }: { me: User; user: User }) {
  return (
    <Link href={`/${user.accountName}`}>
      <div className="flex w-full cursor-pointer flex-row items-center border-b border-neutral px-2 py-2 hover:bg-neutral">
        <MdiAccountPlus className="h-6 w-6" />
        <div className="ml-4 flex min-h-12 flex-col justify-center">
          <div className="flex items-center">
            <UserAvatar
              src={getPublicUrl("User", user.iconPath)}
              className="h-6 w-6"
            />
            <div className="ml-2">{user.displayName}さんがフォローしました</div>
          </div>
        </div>
      </div>
    </Link>
  );
}
