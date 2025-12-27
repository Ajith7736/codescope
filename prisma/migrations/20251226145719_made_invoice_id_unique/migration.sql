/*
  Warnings:

  - A unique constraint covering the columns `[razorpay_invoice_id]` on the table `invoice` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "invoice_razorpay_invoice_id_key" ON "invoice"("razorpay_invoice_id");
