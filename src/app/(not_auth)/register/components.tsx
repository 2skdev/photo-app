"use client";

import ImagePicker from "@/components/ImagePicker";
import {
  UserOptionalInput,
  UserOptionalInputSchema,
} from "@/types/zodExtension";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { addUser } from "./actions";

export function RegisterForm() {
  const { register, control, handleSubmit, setValue } =
    useForm<UserOptionalInput>({
      resolver: zodResolver(UserOptionalInputSchema),
    });

  const image = useWatch({ name: "icon_base64", control });

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
          crop
          onChange={(base64) => {
            if (base64) {
              setValue("icon_base64", base64);
            }
          }}
          picker={
            image ? (
              <img className="hover:cursor-pointer" src={image}></img>
            ) : undefined
          }
        />
      </div>

      <button className="btn btn-primary btn-block" type="submit">
        登録
      </button>
    </form>
  );
}
