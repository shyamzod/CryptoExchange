/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `UserWallet` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "UserWallet_username_key" ON "UserWallet"("username");
