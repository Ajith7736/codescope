/*
  Warnings:

  - You are about to drop the column `completedAt` on the `Analysis` table. All the data in the column will be lost.
  - You are about to drop the column `result` on the `Analysis` table. All the data in the column will be lost.
  - You are about to drop the `File` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[commitid]` on the table `Project` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `lastcommit` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mostused` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ownername` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `projectcode` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `projecttree` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalfiles` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "SubscriptionStatus" AS ENUM ('PENDING', 'ACTIVE', 'CANCELLED', 'EXPIRED', 'FAILED', 'AUTHENTICATED', 'HALTED');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('CAPTURED', 'FAILED', 'AUTHORIZED', 'PAID');

-- DropForeignKey
ALTER TABLE "File" DROP CONSTRAINT "File_projectId_fkey";

-- AlterTable
ALTER TABLE "Analysis" DROP COLUMN "completedAt",
DROP COLUMN "result",
ADD COLUMN     "analysis_output" JSONB,
ADD COLUMN     "score" INTEGER,
ADD COLUMN     "totalissues" INTEGER,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "branch" TEXT,
ADD COLUMN     "commitid" TEXT,
ADD COLUMN     "lastcommit" TEXT NOT NULL,
ADD COLUMN     "mostused" TEXT NOT NULL,
ADD COLUMN     "ownername" TEXT NOT NULL,
ADD COLUMN     "projectcode" TEXT NOT NULL,
ADD COLUMN     "projecttree" TEXT NOT NULL,
ADD COLUMN     "totalfiles" INTEGER NOT NULL;

-- DropTable
DROP TABLE "File";

-- CreateTable
CREATE TABLE "subscriptions" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "planId" VARCHAR(50) NOT NULL,
    "status" "SubscriptionStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "activated_at" TIMESTAMP(3),
    "cancelled_at" TIMESTAMP(3),
    "charge_at" TIMESTAMP(3),
    "completed_at" TIMESTAMP(3),
    "current_end" TIMESTAMP(3),
    "current_start" TIMESTAMP(3),
    "halted_at" TIMESTAMP(3),
    "last_payment_at" TIMESTAMP(3),
    "paid_count" INTEGER NOT NULL,
    "paused_at" TIMESTAMP(3),
    "quantity" INTEGER NOT NULL,
    "razorpay_subscription_id" VARCHAR(100),
    "remaining_count" INTEGER NOT NULL,
    "resumed_at" TIMESTAMP(3),
    "total_count" INTEGER,

    CONSTRAINT "subscriptions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payment" (
    "id" TEXT NOT NULL,
    "razorpay_payment_id" TEXT NOT NULL,
    "razorpay_subscription_id" TEXT,
    "amount" DOUBLE PRECISION NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'INR',
    "status" "PaymentStatus" NOT NULL,
    "method" TEXT,
    "email" TEXT,
    "contact" TEXT,
    "error_code" TEXT,
    "error_desc" TEXT,
    "captured_at" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "payment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "invoice" (
    "id" TEXT NOT NULL,
    "razorpay_invoice_id" TEXT NOT NULL,
    "razorpay_payment_id" TEXT,
    "amount" INTEGER NOT NULL,
    "currency" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "billingStart" TIMESTAMP(3),
    "billingEnd" TIMESTAMP(3),
    "paidAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "razorpay_subscription_id" TEXT,

    CONSTRAINT "invoice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Plan" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'INR',
    "isFree" BOOLEAN NOT NULL DEFAULT false,
    "razorpayPlanId" TEXT,
    "features" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Plan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Overview" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "techStack" TEXT[],
    "keyFeatures" JSONB NOT NULL,
    "useCases" JSONB NOT NULL,
    "architecture" JSONB NOT NULL,
    "howItWorks" JSONB NOT NULL,
    "gettingStarted" JSONB NOT NULL,
    "notableFeatures" JSONB NOT NULL,

    CONSTRAINT "Overview_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Issues" (
    "id" TEXT NOT NULL,
    "severity" TEXT NOT NULL,
    "issuetitle" TEXT NOT NULL,
    "issuedesc" TEXT NOT NULL,
    "issuelocation" TEXT NOT NULL,
    "suggesstedfix" TEXT NOT NULL,
    "analysisId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "suggesstedcode" TEXT,
    "suggesstedcodelanguage" TEXT,

    CONSTRAINT "Issues_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "subscriptions_razorpay_subscription_id_key" ON "subscriptions"("razorpay_subscription_id");

-- CreateIndex
CREATE INDEX "subscriptions_razorpay_subscription_id_idx" ON "subscriptions"("razorpay_subscription_id");

-- CreateIndex
CREATE UNIQUE INDEX "payment_razorpay_payment_id_key" ON "payment"("razorpay_payment_id");

-- CreateIndex
CREATE INDEX "payment_razorpay_subscription_id_idx" ON "payment"("razorpay_subscription_id");

-- CreateIndex
CREATE INDEX "payment_razorpay_payment_id_idx" ON "payment"("razorpay_payment_id");

-- CreateIndex
CREATE INDEX "invoice_razorpay_subscription_id_idx" ON "invoice"("razorpay_subscription_id");

-- CreateIndex
CREATE INDEX "invoice_razorpay_payment_id_idx" ON "invoice"("razorpay_payment_id");

-- CreateIndex
CREATE UNIQUE INDEX "Plan_name_key" ON "Plan"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Plan_razorpayPlanId_key" ON "Plan"("razorpayPlanId");

-- CreateIndex
CREATE UNIQUE INDEX "Overview_projectId_key" ON "Overview"("projectId");

-- CreateIndex
CREATE UNIQUE INDEX "Project_commitid_key" ON "Project"("commitid");

-- AddForeignKey
ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_planId_fkey" FOREIGN KEY ("planId") REFERENCES "Plan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Overview" ADD CONSTRAINT "Overview_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Issues" ADD CONSTRAINT "Issues_analysisId_fkey" FOREIGN KEY ("analysisId") REFERENCES "Analysis"("id") ON DELETE CASCADE ON UPDATE CASCADE;
