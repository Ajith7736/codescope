/*
  Warnings:

  - The values [charged] on the enum `SubscriptionStatus` will be removed. If these variants are still used in the database, this will fail.
  - The `subscription_status` column on the `user` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "SubscriptionStatus_new" AS ENUM ('pending', 'active', 'cancelled', 'expired', 'failed', 'authenticated', 'halted', 'completed');
ALTER TABLE "public"."subscriptions" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "user" ALTER COLUMN "subscription_status" TYPE "SubscriptionStatus_new" USING ("subscription_status"::text::"SubscriptionStatus_new");
ALTER TABLE "subscriptions" ALTER COLUMN "status" TYPE "SubscriptionStatus_new" USING ("status"::text::"SubscriptionStatus_new");
ALTER TYPE "SubscriptionStatus" RENAME TO "SubscriptionStatus_old";
ALTER TYPE "SubscriptionStatus_new" RENAME TO "SubscriptionStatus";
DROP TYPE "public"."SubscriptionStatus_old";
ALTER TABLE "subscriptions" ALTER COLUMN "status" SET DEFAULT 'pending';
COMMIT;

-- AlterTable
ALTER TABLE "user" DROP COLUMN "subscription_status",
ADD COLUMN     "subscription_status" "SubscriptionStatus";
