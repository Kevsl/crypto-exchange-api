/*
  Warnings:

  - You are about to alter the column `dollarAvailables` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "dollarAvailables" SET DATA TYPE DOUBLE PRECISION;
