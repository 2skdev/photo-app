"use client";

import { UserOptionalDefaults, UserOptionalDefaultsSchema } from "@/types/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@prisma/client";
import { useForm } from "react-hook-form";
import { updateProfile } from "./actions";

export function ProfileForm({ me }: { me: User }) {
  const { register, handleSubmit } = useForm<UserOptionalDefaults>({
    defaultValues: { ...me },
    resolver: zodResolver(UserOptionalDefaultsSchema),
  });

  const onSubmit = async (data: UserOptionalDefaults) => {
    await updateProfile(data);
  };

  return (
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

      <button className="btn btn-primary btn-block" type="submit">
        保存
      </button>
    </form>
  );
}
