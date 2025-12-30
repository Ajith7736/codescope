/*
  Warnings:

  - You are about to drop the `Analysis` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Issues` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Overview` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Plan` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Project` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Analysis" DROP CONSTRAINT "Analysis_projectId_fkey";

-- DropForeignKey
ALTER TABLE "Issues" DROP CONSTRAINT "Issues_analysisId_fkey";

-- DropForeignKey
ALTER TABLE "Overview" DROP CONSTRAINT "Overview_projectId_fkey";

-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_userId_fkey";

-- DropForeignKey
ALTER TABLE "subscriptions" DROP CONSTRAINT "subscriptions_planId_fkey";

-- DropTable
DROP TABLE "Analysis";

-- DropTable
DROP TABLE "Issues";

-- DropTable
DROP TABLE "Overview";

-- DropTable
DROP TABLE "Plan";

-- DropTable
DROP TABLE "Project";

-- CreateTable
CREATE TABLE "plan" (
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

    CONSTRAINT "plan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project" (
    "id" TEXT NOT NULL,
    "projectname" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "projectcode" TEXT NOT NULL,
    "ownername" TEXT NOT NULL,
    "mostused" TEXT NOT NULL,
    "totalfiles" INTEGER NOT NULL,
    "lastcommit" TEXT NOT NULL,
    "projecttree" TEXT NOT NULL,
    "branch" TEXT,
    "commitid" TEXT,

    CONSTRAINT "project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "overview" (
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

    CONSTRAINT "overview_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "analysis" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "summary" TEXT,
    "projectId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "totalissues" INTEGER,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "score" INTEGER,
    "analysis_output" JSONB,

    CONSTRAINT "analysis_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "issues" (
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

    CONSTRAINT "issues_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "plan_name_key" ON "plan"("name");

-- CreateIndex
CREATE UNIQUE INDEX "plan_razorpayPlanId_key" ON "plan"("razorpayPlanId");

-- CreateIndex
CREATE UNIQUE INDEX "project_commitid_key" ON "project"("commitid");

-- CreateIndex
CREATE UNIQUE INDEX "overview_projectId_key" ON "overview"("projectId");

-- AddForeignKey
ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_planId_fkey" FOREIGN KEY ("planId") REFERENCES "plan"("razorpayPlanId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project" ADD CONSTRAINT "project_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "overview" ADD CONSTRAINT "overview_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "analysis" ADD CONSTRAINT "analysis_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "issues" ADD CONSTRAINT "issues_analysisId_fkey" FOREIGN KEY ("analysisId") REFERENCES "analysis"("id") ON DELETE CASCADE ON UPDATE CASCADE;
