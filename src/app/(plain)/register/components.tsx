"use client";

import { upsertUser } from "@/actions/user";
import { ImagePicker } from "@/components/ImagePicker";
import { useProgress } from "@/stores/progress";
import { UserOptionalInput, UserOptionalInputSchema } from "@/types/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";

export function RegisterForm() {
  const { withProgress } = useProgress();

  const [image, setImage] = useState<string>();
  const { register, control, handleSubmit, setValue } =
    useForm<UserOptionalInput>({
      resolver: zodResolver(UserOptionalInputSchema),
    });

  const onSubmit = async (data: UserOptionalInput) => {
    withProgress(async () => {
      await upsertUser(data, image);
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <div className="mb-2 text-sm">アカウント名</div>
        <label className="input input-bordered flex items-center">
          @
          <input
            {...register("accountName", {
              required: true,
            })}
            className="ml-2 w-full"
            type="text"
          />
        </label>
      </div>

      <div>
        <div className="mb-2 text-sm">表示名</div>
        <input
          {...register("displayName", {
            required: true,
          })}
          className="input input-bordered w-full"
          type="text"
        />
      </div>

      <div>
        <div className="mb-2 text-sm">アイコン</div>
        <ImagePicker
          crop
          onChange={setImage}
          picker={
            image ? (
              <img
                className="h-32 w-32 cursor-pointer rounded-full"
                src={image}
              ></img>
            ) : undefined
          }
        />
      </div>

      <div className="w-full border-t border-base-100"></div>

      <div className="text-sm">
        アカウントを登録すると、
        <Link className="cursor-pointer text-primary underline" href="/terms">
          利用規約
        </Link>
        に同意したことになります。
      </div>

      <button className="btn btn-primary btn-block" type="submit">
        利用規約に同意して登録
      </button>
    </form>
  );
}
