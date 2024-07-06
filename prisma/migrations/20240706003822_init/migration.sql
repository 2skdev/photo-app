-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL DEFAULT auth.uid(),
    "account_name" VARCHAR(32) NOT NULL,
    "display_name" VARCHAR(32) NOT NULL,
    "biography" TEXT,
    "external_url" VARCHAR(192),
    "icon_url" VARCHAR(192),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post" (
    "id" VARCHAR(10) NOT NULL,
    "user_id" UUID NOT NULL DEFAULT auth.uid(),
    "caption" TEXT NOT NULL DEFAULT '',
    "image_url" VARCHAR(192) NOT NULL,
    "camera" VARCHAR(192),
    "lens" VARCHAR(192),
    "focalLength" VARCHAR(192),
    "fnumber" VARCHAR(192),
    "shutter" VARCHAR(192),
    "iso" VARCHAR(192),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
