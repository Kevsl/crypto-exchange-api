/*
  Warnings:

  - Added the required column `value` to the `PromoCode` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PromoCode" ADD COLUMN     "value" INTEGER NOT NULL;
