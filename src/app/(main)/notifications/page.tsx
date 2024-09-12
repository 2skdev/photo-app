import { getCommentById } from "@/actions/comment";
import { getFollowById } from "@/actions/follow";
import { getLikeById } from "@/actions/like";
import { getNotifications } from "@/actions/notification";
import { getLoginUser } from "@/actions/user";
import { Header } from "@/components/Header";
import { APP_NAME } from "@/constants/string";
import { Icon } from "@iconify/react/dist/iconify.js";
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
  const notifications = await getNotifications();

  return (
    <>
      <Header
        action={
          <Link href="/setting/notifications">
            <Icon icon="mdi:cog" className="h-6 w-6" />
          </Link>
        }
      >
        通知
      </Header>

      {notifications.map(async (notification, index) => {
        if (notification.eventType === "Comment") {
          const comment = await getCommentById(notification.eventId);
          return (
            <CommentNotification
              key={index}
              me={me}
              user={comment.user}
              post={comment.post}
              comment={comment}
            ></CommentNotification>
          );
        } else if (notification.eventType === "Like") {
          const like = await getLikeById(notification.eventId);
          return (
            <LikeNotification
              key={index}
              me={me}
              user={like.user}
              post={like.post}
            />
          );
        } else if (notification.eventType === "Follow") {
          const follow = await getFollowById(notification.eventId);
          return (
            <FollowNotification
              key={index}
              me={me}
              user={follow.followUser}
            ></FollowNotification>
          );
        }
        return <div key={index}></div>;
      })}
    </>
  );
}
