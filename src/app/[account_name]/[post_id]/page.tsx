import prisma from "@/utils/prisma/client";
import { notFound } from "next/navigation";

type Props = {
  params: { account_name: string; post_id: string };
};

export default async function Page({ params }: Props) {
  const post = await prisma.post.findUnique({
    where: {
      id: params.post_id,
    },
  });
  if (!post) {
    notFound();
  }

  return (
    <main>
      <div>{params.account_name}</div>
      <div>{params.post_id}</div>
    </main>
  );
}
