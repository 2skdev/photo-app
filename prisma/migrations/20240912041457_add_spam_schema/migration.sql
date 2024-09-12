-- CreateEnum
CREATE TYPE "SpamType" AS ENUM ('Spam', 'Hate', 'Violent', 'Sensitive', 'Nude', 'Privacy', 'Illegal');

-- CreateTable
CREATE TABLE "Spam" (
    "id" SERIAL NOT NULL,
    "userId" UUID NOT NULL,
    "postId" TEXT NOT NULL,
    "type" "SpamType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Spam_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Spam_userId_postId_type_key" ON "Spam"("userId", "postId", "type");

-- AddForeignKey
ALTER TABLE "Spam" ADD CONSTRAINT "Spam_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Spam" ADD CONSTRAINT "Spam_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
