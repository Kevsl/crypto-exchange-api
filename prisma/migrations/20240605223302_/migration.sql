/*
  Warnings:

  - You are about to alter the column `value` on the `Crypto` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(65,30)`.
  - You are about to alter the column `value_while_trade` on the `Trade` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(65,30)`.
  - You are about to alter the column `amount_traded` on the `Trade` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(65,30)`.
  - You are about to alter the column `dollarAvailables` on the `User` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(65,30)`.
  - You are about to alter the column `amount` on the `UserHasCrypto` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(65,30)`.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Crypto" ALTER COLUMN "value" SET DATA TYPE DECIMAL(65,30);

-- AlterTable
ALTER TABLE "Trade" ALTER COLUMN "value_while_trade" SET DATA TYPE DECIMAL(65,30),
ALTER COLUMN "amount_traded" SET DATA TYPE DECIMAL(65,30);

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "dollarAvailables" SET DATA TYPE DECIMAL(65,30);

-- AlterTable
ALTER TABLE "UserHasCrypto" ALTER COLUMN "amount" SET DATA TYPE DECIMAL(65,30);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
