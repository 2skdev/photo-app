"use server";

import { uploadImage } from "@/actions/storage";
import { getLoginUser } from "@/actions/user";
import prisma from "@/libs/prisma/client";
import {
  Post,
  PostOptionalDefaultsSchema,
  PostOptionalInput,
  User,
} from "@/types/zod";
import random from "@/utils/random";
import { notFound, redirect } from "next/navigation";

export async function getPost(id: string): Promise<Post> {
  const post = await prisma.post.findUnique({
    where: {
      id: id,
      deletedAt: null,
    },
  });

  if (!post) {
    notFound();
  }

  return post;
}

export async function getPosts(
  user?: User,
): Promise<Array<Post & { user: User }>> {
  const posts = await prisma.post.findMany({
    where: {
      user: user,
      deletedAt: null,
    },
    take: 10,
    skip: 0,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      user: true,
    },
  });

  return posts;
}

export async function addPost(input: PostOptionalInput, image: string) {
  const me = await getLoginUser();

  let redirectTo = undefined;

  try {
    const path = await uploadImage("Post", image);

    const data = PostOptionalDefaultsSchema.parse({
      ...input,
      id: random(10),
      userId: me.id,
      imagePath: path,
    });

    const { id } = await prisma.post.create({
      data: { ...data },
    });

    redirectTo = `/${me.accountName}/${id}`;
  } catch (e) {
    // TODO: need error handling(delete uploaded image)
    console.log(e);
  }

  if (redirectTo) {
    redirect(redirectTo);
  }
}

export async function updatePost(input: PostOptionalInput) {
  const data = PostOptionalDefaultsSchema.parse({
    ...input,
  });

  return await prisma.post.update({
    where: {
      id: data.id,
    },
    data: {
      ...data,
    },
  });
}

export async function deletePost(post: Post) {
  // todo: delete from storage
  return await prisma.post.update({
    where: {
      id: post.id,
    },
    data: {
      deletedAt: new Date(),
    },
  });
}
