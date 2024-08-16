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
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mt-4">
        <div className="mb-2 text-sm">アカウント名</div>
        <label className="input input-bordered flex items-center gap-2">
          @
          <input
            {...register("account_name", {
              required: true,
            })}
            className="w-full"
            type="text"
          />
        </label>
      </div>

      <div className="mt-4">
        <div className="mb-2 text-sm">表示名</div>
        <input
          {...register("display_name", {
            required: true,
          })}
          className="input input-bordered w-full"
          type="text"
        />
      </div>

      <div className="mt-4">
        <div className="mb-2 text-sm">アイコン</div>
        <ImagePicker
          crop
          onChange={(base64) => {
            if (base64) {
              setValue("icon_base64", base64);
            }
          }}
          picker={
            image ? (
              <img
                className="h-32 w-32 rounded-full hover:cursor-pointer"
                src={image}
              ></img>
            ) : undefined
          }
        />
      </div>

      <div className="my-8 w-full border-t border-base-100"></div>

      <button className="btn btn-primary btn-block" type="submit">
        登録
      </button>
    </form>
  );
}
