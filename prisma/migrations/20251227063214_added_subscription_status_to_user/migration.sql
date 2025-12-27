/*
  Warnings:

  - The values [PAID] on the enum `PaymentStatus` will be removed. If these variants are still used in the database, this will fail.
  - A unique constraint covering the columns `[razorpay_customer_id]` on the table `user` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "PaymentStatus_new" AS ENUM ('CAPTURED', 'FAILED', 'AUTHORIZED', 'REFUNDED', 'CREATED');
ALTER TABLE "payment" ALTER COLUMN "status" TYPE "PaymentStatus_new" USING ("status"::text::"PaymentStatus_new");
ALTER TYPE "PaymentStatus" RENAME TO "PaymentStatus_old";
ALTER TYPE "PaymentStatus_new" RENAME TO "PaymentStatus";
DROP TYPE "public"."PaymentStatus_old";
COMMIT;

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "razorpay_customer_id" TEXT,
ADD COLUMN     "subscription_end_date" TIMESTAMP(3),
ADD COLUMN     "subscription_status" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "user_razorpay_customer_id_key" ON "user"("razorpay_customer_id");
