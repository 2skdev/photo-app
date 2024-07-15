"use client";

import ImagePicker from "@/components/ImagePicker";
import {
  PostOptionalInput,
  PostOptionalInputSchema,
} from "@/types/zodExtension";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { addPost } from "./actions";

export function NewPostForm() {
  const { register, handleSubmit, setValue } = useForm<PostOptionalInput>({
    resolver: zodResolver(PostOptionalInputSchema),
  });

  const onSubmit = async (data: PostOptionalInput) => {
    await addPost(data);
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register("caption", {
          required: true,
        })}
        className="input input-bordered w-full"
        type="text"
        placeholder="キャプションを入力"
      />

      <div>
        <ImagePicker
          onChange={(base64) => {
            if (base64) {
              setValue("image_base64", base64);
            }
          }}
        />
      </div>

      <button className="btn btn-primary btn-block" type="submit">
        保存
      </button>
    </form>
  );
}
