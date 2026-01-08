-- DropIndex
DROP INDEX "subscriptions_razorpay_subscription_id_idx";

-- CreateIndex
CREATE INDEX "subscriptions_razorpay_subscription_id_userId_idx" ON "subscriptions"("razorpay_subscription_id", "userId");
