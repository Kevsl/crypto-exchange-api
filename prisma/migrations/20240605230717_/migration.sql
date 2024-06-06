/*
  Warnings:

  - You are about to alter the column `value` on the `Crypto` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.
  - You are about to alter the column `amount_traded` on the `Trade` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.
  - You are about to alter the column `amount` on the `UserHasCrypto` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Crypto" ALTER COLUMN "value" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "Trade" ALTER COLUMN "amount_traded" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "UserHasCrypto" ALTER COLUMN "amount" SET DATA TYPE INTEGER;
