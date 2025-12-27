/*
  Warnings:

  - The values [CAPTURED,FAILED,AUTHORIZED,REFUNDED,CREATED] on the enum `PaymentStatus` will be removed. If these variants are still used in the database, this will fail.
  - The values [PENDING,ACTIVE,CANCELLED,EXPIRED,FAILED,AUTHENTICATED,HALTED,CHARGED,COMPLETED] on the enum `SubscriptionStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "PaymentStatus_new" AS ENUM ('captured', 'failed', 'authorized', 'refunded', 'created');
ALTER TABLE "payment"
ALTER COLUMN "status" TYPE "PaymentStatus_new"
USING (LOWER("status"::text)::"PaymentStatus_new");
ALTER TYPE "PaymentStatus" RENAME TO "PaymentStatus_old";
ALTER TYPE "PaymentStatus_new" RENAME TO "PaymentStatus";
DROP TYPE "public"."PaymentStatus_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "SubscriptionStatus_new" AS ENUM ('pending', 'active', 'cancelled', 'expired', 'failed', 'authenticated', 'halted', 'charged', 'completed');
ALTER TABLE "public"."subscriptions" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "subscriptions"
ALTER COLUMN "status" TYPE "SubscriptionStatus_new"
USING (LOWER("status"::text)::"SubscriptionStatus_new");
ALTER TYPE "SubscriptionStatus" RENAME TO "SubscriptionStatus_old";
ALTER TYPE "SubscriptionStatus_new" RENAME TO "SubscriptionStatus";
DROP TYPE "public"."SubscriptionStatus_old";
ALTER TABLE "subscriptions" ALTER COLUMN "status" SET DEFAULT 'pending';
COMMIT;

-- AlterTable
ALTER TABLE "subscriptions" ALTER COLUMN "status" SET DEFAULT 'pending';
