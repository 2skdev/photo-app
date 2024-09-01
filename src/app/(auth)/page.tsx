import { getFollow } from "@/actions/follow";
import { getLike, getLikeUserCount } from "@/actions/like";
import { getPosts } from "@/actions/post";
import { getPublicUrl } from "@/actions/storage";
import { getLoginUser } from "@/actions/user";
import { Header } from "@/components/Header";
import { MdiCog } from "@/components/Icons";
import { PostItem } from "@/components/PostItem";
import { APP_NAME } from "@/constants/string";
import Link from "next/link";

export async function generateMetadata() {
  return {
    title: APP_NAME,
  };
}

export default async function Page() {
  const me = await getLoginUser();

  // todo: load next
  const posts = await getPosts();

  return (
    <>
      <Header
        spOnly
        action={
          <Link href="/setting">
            <MdiCog className="h-6 w-6" />
          </Link>
        }
      >
        ホーム
      </Header>

      {posts.map(async (post) => (
        <div key={post.id} className="w-full">
          <PostItem
            post={{
              ...post,
              imageSrc: (await getPublicUrl("Post", post.imagePath))!,
            }}
            user={{
              ...post.user,
              iconSrc:
                (await getPublicUrl("User", post.user.iconPath)) ?? undefined,
            }}
            me={me}
            follow={await getFollow(me, post.user)}
            like={await getLike(me, post)}
            likeCount={await getLikeUserCount(post)}
          />
          <div className="my-4 w-full border-b border-neutral" />
        </div>
      ))}
    </>
  );
}
