"use client";

import { addComment } from "@/actions/comment";
import {
  CommentOptionalInput,
  CommentOptionalInputSchema,
  Post,
} from "@/types/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useForm } from "react-hook-form";

export function CommentForm({ post }: { post: Post }) {
  const { register, getValues } = useForm<CommentOptionalInput>({
    resolver: zodResolver(CommentOptionalInputSchema),
  });

  const onSubmit = () => {
    addComment({
      ...getValues(),
      postId: post.id,
    });
  };

  return (
    <label className="input input-bordered flex items-center">
      <input
        {...register("text")}
        type="text"
        className="grow"
        placeholder="コメントを入力"
      />
      <Icon icon="mdi:send" className="cursor-pointer" onClick={onSubmit} />
    </label>
  );
}
