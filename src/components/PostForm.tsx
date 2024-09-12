"use client";

import { addPost } from "@/actions/post";
import { addSpot } from "@/actions/spot";
import { Map } from "@/components/Map";
import { useModal } from "@/providers/ModalProvider";
import { useProgress } from "@/providers/ProgressProvider";
import {
  PostOptionalInput,
  PostOptionalInputSchema,
  SpotOptionalDefaults,
  SpotOptionalDefaultsSchema,
} from "@/types/zod";
import { getAddress } from "@/utils/osm";
import { zodResolver } from "@hookform/resolvers/zod";
import exifr from "exifr";
import { ReactNode, useEffect, useState } from "react";
import { useForm, UseFormReturn, useWatch } from "react-hook-form";
import { MdiArrowLeft, MdiClose } from "./Icons";
import { ImagePicker } from "./ImagePicker";

type PostFormStepProps = {
  onNext: () => void;
  postForm: UseFormReturn<PostOptionalInput>;
  spotForm: UseFormReturn<SpotOptionalDefaults>;
};

function UploadImage({ onNext, postForm, spotForm }: PostFormStepProps) {
  const { withProgress } = useProgress();

  const onChange = async (base64?: string) => {
    if (!base64) return;

    postForm.setValue("imageSrc", base64);

    const exif = await exifr.parse(base64);

    if (exif) {
      postForm.setValue(
        "camera",
        exif.Make && exif.Model ? `${exif.Make} ${exif.Model}` : "",
      );
      postForm.setValue("lens", exif.LensModel);
      postForm.setValue(
        "focalLength",
        exif.FocalLength ? `${exif.FocalLength}mm` : "",
      );
      postForm.setValue("fnumber", exif.FNumber ? `f/${exif.FNumber}` : "");
      postForm.setValue(
        "shutter",
        exif.ExposureTime ? `1/${1 / exif.ExposureTime}` : "",
      );
      postForm.setValue("iso", exif.ISO ? `ISO${exif.ISO}` : "");
      postForm.setValue("wb", exif.WhiteBalance);
      postForm.setValue("shotAt", exif.CreateDate);

      if (exif.GPSLatitude && exif.GPSLongitude) {
        let lat =
          exif.GPSLatitude[0] +
          exif.GPSLatitude[1] / 60 +
          exif.GPSLatitude[2] / 3600;
        let lon =
          exif.GPSLongitude[0] +
          exif.GPSLongitude[1] / 60 +
          exif.GPSLongitude[2] / 3600;

        if (exif.GPSLatitudeRef !== "N") {
          lat *= -1;
        }
        if (exif.GPSLongitudeRef !== "E") {
          lon *= -1;
        }

        spotForm.setValue("latitude", lat);
        spotForm.setValue("longitude", lon);

        const { name } = await getAddress(lat, lon);
        spotForm.setValue("name", name);
      }
    }
    onNext();
  };

  return (
    <ImagePicker onChange={(base64) => withProgress(() => onChange(base64))} />
  );
}

function InputMeta({ postForm }: PostFormStepProps) {
  const image = useWatch({ name: "imageSrc", control: postForm.control });

  return (
    <div className="flex flex-col items-center space-y-1">
      <img src={image} className="max-h-56 max-w-56 rounded object-contain" />

      <div className="w-full">
        <div className="label label-text">カメラ</div>
        <input
          {...postForm.register("camera")}
          className="input input-bordered w-full"
        />

        <div className="label label-text">レンズ</div>
        <input
          {...postForm.register("lens")}
          className="input input-bordered w-full"
        />

        <div className="label label-text">焦点距離</div>
        <input
          {...postForm.register("focalLength")}
          className="input input-bordered w-full"
        />

        <div className="label label-text">F値</div>
        <input
          {...postForm.register("fnumber")}
          className="input input-bordered w-full"
        />

        <div className="label label-text">シャッタースピード</div>
        <input
          {...postForm.register("shutter")}
          className="input input-bordered w-full"
        />

        <div className="label label-text">ISO</div>
        <input
          {...postForm.register("iso")}
          className="input input-bordered w-full"
        />

        <div className="label label-text">ホワイトバランス</div>
        <input
          {...postForm.register("wb")}
          className="input input-bordered w-full"
        />

        <div className="label label-text">撮影日時(FIXME)</div>
        <input
          {...postForm.register("shotAt")}
          type="datetime-local"
          className="input input-bordered w-full"
        />
      </div>
    </div>
  );
}

function InputSpot({ spotForm }: PostFormStepProps) {
  const latitude = useWatch({ name: "latitude", control: spotForm.control });
  const longitude = useWatch({ name: "longitude", control: spotForm.control });
  const latlon: [number, number] | undefined =
    latitude && longitude ? [latitude, longitude] : undefined;

  return (
    <>
      <Map center={latlon} marker={latlon} />

      <div className="label label-text">スポット名称</div>
      <input
        {...spotForm.register("name")}
        className="input input-bordered w-full"
      />

      <div className="label label-text">緯度</div>
      <input
        {...spotForm.register("latitude")}
        className="input input-bordered w-full"
      />

      <div className="label label-text">経度</div>
      <input
        {...spotForm.register("longitude")}
        className="input input-bordered w-full"
      />

      <div className="form-control">
        <label className="label cursor-pointer justify-start space-x-2">
          <input
            {...spotForm.register("private")}
            type="checkbox"
            className="checkbox-primary checkbox"
          />
          <span className="label-text">撮影スポットを非公開</span>
        </label>
      </div>
    </>
  );
}

function InputComment({ postForm }: PostFormStepProps) {
  return (
    <>
      <div className="label label-text">コメント</div>
      <textarea
        {...postForm.register("text")}
        rows={4}
        className="textarea textarea-bordered w-full resize-none"
      ></textarea>

      <div className="form-control">
        <label className="label cursor-pointer justify-start space-x-2">
          <input
            {...postForm.register("private")}
            type="checkbox"
            className="checkbox-primary checkbox"
          />
          <span className="label-text">投稿を非公開</span>
        </label>
      </div>
    </>
  );
}

export function PostForm({ onDispose }: { onDispose: () => void }) {
  const [step, setStep] = useState(0);
  const { withProgress } = useProgress();

  const postForm: UseFormReturn<PostOptionalInput> = useForm<PostOptionalInput>(
    { resolver: zodResolver(PostOptionalInputSchema) },
  );
  const spotForm: UseFormReturn<SpotOptionalDefaults> =
    useForm<SpotOptionalDefaults>({
      resolver: zodResolver(SpotOptionalDefaultsSchema),
    });

  useEffect(() => {
    if (step === 0) {
      postForm.reset();
      spotForm.reset();
    }
  }, [step === 0]);

  const onNext = async () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      withProgress(async () => {
        try {
          // FIXME: use zod parse
          const spot = await addSpot(spotForm.getValues());
          postForm.setValue("spotId", spot.id);
        } catch {}
        await addPost(postForm.getValues());

        onDispose();
      });
    }
  };

  const onPrev = () => {
    if (step > 0) {
      setStep(step - 1);
    } else {
      onDispose();
    }
  };

  const steps = [
    {
      title: "画像を選択",
      canNext: () => false,
      child: (
        <UploadImage onNext={onNext} postForm={postForm} spotForm={spotForm} />
      ),
    },
    {
      title: "撮影情報を入力",
      canNext: () => true,
      child: (
        <InputMeta onNext={onNext} postForm={postForm} spotForm={spotForm} />
      ),
    },
    {
      title: "撮影スポットを入力",
      canNext: () => true,
      child: (
        <InputSpot onNext={onNext} postForm={postForm} spotForm={spotForm} />
      ),
    },
    {
      title: "コメントを入力",
      canNext: () => true,
      child: (
        <InputComment onNext={onNext} postForm={postForm} spotForm={spotForm} />
      ),
    },
  ];

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <button className="btn btn-square btn-ghost btn-sm" onClick={onPrev}>
          {step === 0 ? <MdiClose /> : <MdiArrowLeft />}
        </button>
        <div className="ml-2 font-bold">{steps[step].title}</div>

        <button
          className="btn btn-primary btn-sm ml-auto"
          disabled={!steps[step].canNext()}
          onClick={onNext}
        >
          {step === steps.length - 1 ? "投稿する" : "次へ"}
        </button>
      </div>
      <div className="md:w-[70vw]">{steps[step].child}</div>
    </div>
  );
}

function DisposeAlert({
  onDispose,
  onCancel,
}: {
  onDispose: () => void;
  onCancel: () => void;
}) {
  return (
    <>
      <div className="my-2 text-lg">変更を破棄しますか？</div>
      <div className="text-sm">
        このまま移動すると、編集内容は保存されません
      </div>
      <div className="mt-4 border-t border-neutral pt-2">
        <button
          className="btn btn-ghost btn-block text-error"
          onClick={onDispose}
        >
          破棄
        </button>
        <button className="btn btn-ghost btn-block" onClick={onCancel}>
          キャンセル
        </button>
      </div>
    </>
  );
}

export function PostFormModalButton({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const { open: openForm, close: closeForm } = useModal();
  const { open: openAlert, close: closeAlert } = useModal();

  const onDispose = () => {
    closeAlert();
    closeForm();
  };

  return (
    <button
      className={className}
      onClick={() => {
        openForm(<PostForm onDispose={onDispose} />, () => {
          openAlert(
            <DisposeAlert onCancel={closeAlert} onDispose={onDispose} />,
          );
          return false;
        });
      }}
    >
      {children}
    </button>
  );
}
