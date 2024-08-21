import { PostItem } from "@/components/PostItem";
import prisma from "@/utils/prisma/client";
import { getPublicUrl } from "@/utils/supabase/storage";

export default async function Page() {
  // todo: load next
  const posts = await prisma.post.findMany({
    take: 10,
    skip: 0,
    orderBy: {
      created_at: "desc",
    },
    include: {
      user: true,
    },
  });

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
          <div className="my-4 w-full border border-neutral" />
        </div>
      ))}
    </>
  );
}
