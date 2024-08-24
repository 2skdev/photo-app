"use server";

import { uploadImage } from "@/actions/storage";
import { getLoginUser } from "@/actions/user";
import prisma from "@/libs/prisma/client";
import { Post, PostOptionalDefaultsSchema, User } from "@/models/zod";
import { PostOptionalInput } from "@/models/zodExtension";
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

export async function addPost(input: PostOptionalInput) {
  const me = await getLoginUser();

  let redirectTo = undefined;

  try {
    const path = await uploadImage(input.imageSrc, "Post");

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
    // TODO: need error handling
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
  return await prisma.post.update({
    where: {
      id: post.id,
    },
    data: {
      deletedAt: new Date(),
    },
  });
}
