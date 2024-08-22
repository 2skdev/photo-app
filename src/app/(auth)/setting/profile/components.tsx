"use client";

import { updateUser } from "@/actions/user";
import { MaterialSymbolsEdit } from "@/components/icons";
import ImagePicker from "@/components/ImagePicker";
import Switcher from "@/components/Switcher";
import UserAvatar from "@/components/UserAvatar";
import { User } from "@/models/zod";
import {
  UserOptionalInput,
  UserOptionalInputSchema,
} from "@/models/zodExtension";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";

export function ProfileForm({
  me,
  icon_url,
}: {
  me?: User;
  icon_url?: string | null;
}) {
  const { register, control, handleSubmit, setValue } =
    useForm<UserOptionalInput>({
      defaultValues: { ...me },
      resolver: zodResolver(UserOptionalInputSchema),
    });

  const image = useWatch({ name: "icon_src", control });

  const onSubmit = async (data: UserOptionalInput) => {
    await updateUser(data);
  };

  function IconPicker() {
    return (
      <div className="flex items-center justify-center">
        <ImagePicker
          crop
          onChange={(base64) => {
            if (base64) {
              setValue("icon_src", base64);
            }
          }}
          picker={
            <div className="relative flex flex-col">
              <UserAvatar
                src={image ?? icon_url}
                className="h-36 w-36 hover:cursor-pointer"
              />
              <div className="btn btn-sm absolute -left-4 bottom-2 bg-opacity-90">
                <MaterialSymbolsEdit />
                変更
              </div>
            </div>
          }
        />
      </div>
    );
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Switcher sp={<IconPicker />} />

        <div className="grid md:grid-cols-3">
          <div className="col-span-2 space-y-4">
            <div>
              <div className="mb-2 text-sm">アカウント名</div>
              <label className="input input-bordered flex items-center">
                @
                <input
                  {...register("account_name", {
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
                {...register("display_name", {
                  required: true,
                })}
                className="input input-bordered w-full"
                type="text"
              />
            </div>
          </div>

          <Switcher pc={<IconPicker />} />
        </div>

        <div>
          <div className="mb-2 text-sm">ウェブサイト</div>
          <input
            {...register("external_url", {
              required: true,
            })}
            className="input input-bordered w-full"
            type="url"
          />
        </div>

        <div>
          <div className="mb-2 text-sm">自己紹介</div>
          <textarea
            {...register("biography", {
              required: true,
            })}
            rows={4}
            className="textarea textarea-bordered w-full resize-none text-[1rem]"
          ></textarea>
        </div>

        <button className="btn btn-primary btn-block" type="submit">
          保存
        </button>
      </form>
    </>
  );
}
