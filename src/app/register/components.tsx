"use client";

import ImagePicker from "@/components/ImagePicker";
import {
  UserOptionalInput,
  UserOptionalInputSchema,
} from "@/types/zodExtension";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { addUser } from "./actions";

export function RegisterForm() {
  const { register, handleSubmit, setValue } = useForm<UserOptionalInput>({
    resolver: zodResolver(UserOptionalInputSchema),
  });

  const onSubmit = async (data: UserOptionalInput) => {
    await addUser(data);
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <label className="input input-bordered flex items-center gap-2">
        @
        <input
          {...register("account_name", {
            required: true,
          })}
          className="w-full"
          type="text"
          placeholder="アカウント名"
        />
      </label>

      <input
        {...register("display_name", {
          required: true,
        })}
        className="input input-bordered w-full"
        type="text"
        placeholder="名前"
      />

      <div>
        <ImagePicker
          onChange={(base64) => {
            if (base64) {
              setValue("icon_base64", base64);
            }
          }}
        />
      </div>

      <button className="btn btn-primary btn-block" type="submit">
        登録
      </button>
    </form>
  );
}
