-- CreateTable
CREATE TABLE "UserWallet" (
    "Id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "BTCBalance" BIGINT NOT NULL,
    "USDTBalance" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "UserWallet_pkey" PRIMARY KEY ("Id")
);
