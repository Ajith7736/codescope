/*
  Warnings:

  - Added the required column `summary` to the `overview` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "overview" ADD COLUMN     "summary" TEXT NOT NULL;
