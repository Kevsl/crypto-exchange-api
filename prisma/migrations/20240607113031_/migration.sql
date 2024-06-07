/*
  Warnings:

  - You are about to drop the column `id_offer` on the `Trade` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Trade" DROP CONSTRAINT "Trade_id_offer_fkey";

-- AlterTable
ALTER TABLE "Trade" DROP COLUMN "id_offer";
