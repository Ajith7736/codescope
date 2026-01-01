/*
  Warnings:

  - You are about to drop the column `summary` on the `overview` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "overview" DROP COLUMN "summary";

-- AlterTable
ALTER TABLE "project" ADD COLUMN     "summary" TEXT;
