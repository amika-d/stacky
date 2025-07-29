/*
  Warnings:

  - You are about to drop the column `createdAT` on the `Fragment` table. All the data in the column will be lost.
  - You are about to drop the column `createdAT` on the `Message` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Fragment" DROP COLUMN "createdAT",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Message" DROP COLUMN "createdAT",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
