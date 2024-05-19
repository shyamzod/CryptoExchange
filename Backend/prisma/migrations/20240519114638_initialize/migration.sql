-- CreateTable
CREATE TABLE "userBankBalance" (
    "Id" SERIAL NOT NULL,
    "Branch" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "BankBalance" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "userBankBalance_pkey" PRIMARY KEY ("Id")
);

-- CreateIndex
CREATE UNIQUE INDEX "userBankBalance_username_key" ON "userBankBalance"("username");
