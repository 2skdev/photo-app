"use client";

import ImagePicker from "@/components/ImagePicker";
import {
  UserOptionalInput,
  UserOptionalInputSchema,
} from "@/types/zodExtension";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@prisma/client";
import { useForm, useWatch } from "react-hook-form";
import { updateProfile } from "./actions";

export function ProfileForm({ me }: { me: User }) {
  const { register, control, handleSubmit, setValue } =
    useForm<UserOptionalInput>({
      defaultValues: { ...me },
      resolver: zodResolver(UserOptionalInputSchema),
    });

  const image = useWatch({ name: "icon_base64", control });

  const onSubmit = async (data: UserOptionalInput) => {
    await updateProfile(data);
  };

  return (
    <>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("display_name", {
            required: true,
          })}
          className="input input-bordered w-full"
          type="text"
          placeholder="名前"
        />

        <input
          {...register("biography")}
          className="input input-bordered w-full"
          type="text"
          placeholder="自己紹介"
        />

        <input
          {...register("biography")}
          className="input input-bordered w-full"
          type="url"
          placeholder="ウェブサイト"
        />

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
                className="rounded-full hover:cursor-pointer"
                src={image}
              ></img>
            ) : undefined
          }
        />

        <button className="btn btn-primary btn-block" type="submit">
          保存
        </button>
      </form>
    </>
  );
}
