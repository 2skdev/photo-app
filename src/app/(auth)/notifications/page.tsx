import { getCommentById } from "@/actions/comment";
import { getFollowById } from "@/actions/follow";
import { getLikeById } from "@/actions/like";
import { getNotifications } from "@/actions/notification";
import { getPublicUrl } from "@/actions/storage";
import { getLoginUser } from "@/actions/user";
import { Header } from "@/components/Header";
import { MdiCog } from "@/components/Icons";
import { APP_NAME } from "@/constants/string";
import { PostImage, UserImage } from "@/models/zodExtension";
import Link from "next/link";
import {
  CommentNotification,
  FollowNotification,
  LikeNotification,
} from "./components";

export async function generateMetadata() {
  return {
    title: `通知 | ${APP_NAME}`,
  };
}

export default async function Page() {
  const me = await getLoginUser();
  const notifications = await getNotifications(me);

  return (
    <>
      <Header
        action={
          <Link href="/setting/notifications">
            <MdiCog className="h-6 w-6" />
          </Link>
        }
      >
        通知
      </Header>

      {notifications.map(async (notification, index) => {
        if (notification.eventType === "Comment") {
          const comment = await getCommentById(notification.eventId);

          const user: UserImage = {
            ...comment.user,
            iconSrc:
              (await getPublicUrl("User", comment.user.iconPath)) ?? undefined,
          };
          const post: PostImage = {
            ...comment.post,
            imageSrc: (await getPublicUrl("Post", comment.post.imagePath))!,
          };

          return (
            <CommentNotification
              key={index}
              me={me}
              user={user}
              post={post}
              comment={comment}
            ></CommentNotification>
          );
        } else if (notification.eventType === "Like") {
          const like = await getLikeById(notification.eventId);

          const user: UserImage = {
            ...like.user,
            iconSrc:
              (await getPublicUrl("User", like.user.iconPath)) ?? undefined,
          };
          const post: PostImage = {
            ...like.post,
            imageSrc: (await getPublicUrl("Post", like.post.imagePath))!,
          };

          return (
            <LikeNotification key={index} me={me} user={user} post={post} />
          );
        } else if (notification.eventType === "Follow") {
          const follow = await getFollowById(notification.eventId);

          const user: UserImage = {
            ...follow.user,
            iconSrc:
              (await getPublicUrl("User", follow.user.iconPath)) ?? undefined,
          };
          return (
            <FollowNotification
              key={index}
              me={me}
              user={user}
            ></FollowNotification>
          );
        }
        return <div key={index}></div>;
      })}
    </>
  );
}
