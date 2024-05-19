/*
  Warnings:

  - You are about to alter the column `BTCBalance` on the `UserWallet` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "UserWallet" ALTER COLUMN "BTCBalance" SET DATA TYPE INTEGER;
