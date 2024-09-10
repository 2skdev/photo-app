/*
  Warnings:

  - You are about to drop the column `title` on the `Spot` table. All the data in the column will be lost.
  - Made the column `name` on table `Spot` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Spot" DROP COLUMN "title",
ALTER COLUMN "name" SET NOT NULL;
