import { getPost } from "@/actions/post";
import { getLoginUser, getUser } from "@/actions/user";
import { Header } from "@/components/Header";
import { Map } from "@/components/Map";
import { UserAvatar } from "@/components/UserAvatar";
import { APP_NAME } from "@/constants/string";
import prisma from "@/libs/prisma/client";
import { getDateString } from "@/utils/date";
import { getPublicUrl } from "@/utils/storage";
import { notFound } from "next/navigation";
import { TimelineItem } from "../../_index/components";
import { CommentForm } from "./components";

type Props = {
  params: { accountName: string; postId: string };
};

export async function generateMetadata(props: Props) {
  const post = await getPost(props.params.postId);
  const user = await getUser(props.params.accountName);

  return {
    title: `${user.displayName}(@${user.accountName})さんの投稿 ${post.text !== "" ? `| ${post.text}` : ""} | ${APP_NAME}`,
    description: post.text,
    openGraph: {
      images: [getPublicUrl("Post", post.imagePath)],
    },
  };
}

export default async function Page({ params }: Props) {
  const me = await getLoginUser();

  const post = await prisma.post.findUnique({
    where: {
      id: params.postId,
      deletedAt: null,
    },
    include: {
      user: true,
      spot: true,
    },
  });

  if (!post) {
    notFound();
  }

  const comments = await prisma.comment.findMany({
    where: {
      postId: post.id,
    },
    include: {
      user: true,
    },
  });

  return (
    <div>
      <Header spOnly back>
        投稿
      </Header>

      {/* TODO: move to components */}
      <TimelineItem
        item={{
          post,
          user: post.user,
          spot: post.spot,
          me,
          like: await prisma.like.findUnique({
            where: {
              userId_postId: {
                userId: me.id,
                postId: post.id,
              },
              deletedAt: null,
            },
          }),
          follow: await prisma.follow.findUnique({
            where: {
              userId_followUserId: {
                userId: me.id,
                followUserId: post.userId,
              },
              deletedAt: null,
            },
          }),
          count: {
            like: await prisma.like.count({
              where: {
                post,
                deletedAt: null,
              },
            }),
            comment: await prisma.comment.count({
              where: {
                post,
                deletedAt: null,
              },
            }),
          },
        }}
      />

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <Map
          center={
            post.spot ? [post.spot.latitude, post.spot.longitude] : undefined
          }
          marker={
            post.spot ? [post.spot.latitude, post.spot.longitude] : undefined
          }
        />
        <div className="order-first flex w-full flex-col md:order-last">
          <div className="flex items-end justify-between border-b border-b-neutral p-1">
            <div className="text-xs">カメラ</div>
            <div>{post.camera ?? "-"}</div>
          </div>
          <div className="flex items-end justify-between border-b border-b-neutral p-1">
            <div className="text-xs">レンズ</div>
            <div>{post.lens ?? "-"}</div>
          </div>
          <div className="flex items-end justify-between border-b border-b-neutral p-1">
            <div className="text-xs">焦点距離</div>
            <div>{post.focalLength ?? "-"}</div>
          </div>
          <div className="flex items-end justify-between border-b border-b-neutral p-1">
            <div className="text-xs">F値</div>
            <div>{post.fnumber ?? "-"}</div>
          </div>
          <div className="flex items-end justify-between border-b border-b-neutral p-1">
            <div className="text-xs">シャッタースピード</div>
            <div>{post.shutter ?? "-"}</div>
          </div>
          <div className="flex items-end justify-between border-b border-b-neutral p-1">
            <div className="text-xs">ISO</div>
            <div>{post.iso ?? "-"}</div>
          </div>
          <div className="flex items-end justify-between border-b border-b-neutral p-1">
            <div className="text-xs">ホワイトバランス</div>
            <div>{post.wb ?? "-"}</div>
          </div>
          <div className="flex items-end justify-between border-b border-b-neutral p-1">
            <div className="text-xs">緯度</div>
            <div>{post.spot?.latitude ?? "-"}</div>
          </div>
          <div className="flex items-end justify-between border-b border-b-neutral p-1">
            <div className="text-xs">経度</div>
            <div>{post.spot?.longitude ?? "-"}</div>
          </div>
          <div className="flex items-end justify-between border-b border-b-neutral p-1">
            <div className="text-xs">撮影日時</div>
            <div>{post.shotAt?.toLocaleString() ?? "-"}</div>
          </div>
        </div>
      </div>

      <div className="mt-4 border-t border-neutral pt-4">
        <div className="mb-2">
          <CommentForm post={post} />
        </div>

        {comments.map((comment) => (
          <div className="py-2" key={comment.id}>
            <div className="flex items-center">
              <UserAvatar
                className="h-8 w-8"
                src={getPublicUrl("User", comment.user.iconPath)}
              />
              <div className="ml-2">{comment.user.displayName}</div>
              <div className="ml-1 text-sm font-light">
                @{comment.user.accountName}
              </div>
              <div className="ml-2 pt-1 text-sm font-light">
                • {getDateString(comment.createdAt)}
              </div>
            </div>
            <div className="mt-2">{comment.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
