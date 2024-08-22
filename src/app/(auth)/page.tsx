import { getPosts } from "@/actions/post";
import { getPublicUrl } from "@/actions/storage";
import { PostItem } from "@/components/PostItem";

export default async function Page() {
  // todo: load next
  const posts = await getPosts();

  return (
    <>
      {posts.map(async (post) => (
        <div key={post.id} className="w-full">
          <PostItem
            post={post}
            postImageSrc={await getPublicUrl("Post", post.image_path)}
            user={post.user}
            userIconSrc={await getPublicUrl("User", post.user.icon_path)}
          />
          <div className="my-4 w-full border-b border-neutral" />
        </div>
      ))}
    </>
  );
}
