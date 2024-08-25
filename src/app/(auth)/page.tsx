import { getFollow } from "@/actions/follow";
import { getPosts } from "@/actions/post";
import { getPublicUrl } from "@/actions/storage";
import { getLoginUser } from "@/actions/user";
import { PostItem } from "@/components/PostItem";

export default async function Page() {
  const me = await getLoginUser();

  // todo: load next
  const posts = await getPosts();

  return (
    <>
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
          />
          <div className="my-4 w-full border-b border-neutral" />
        </div>
      ))}
    </>
  );
}
