-- CreateTable
CREATE TABLE "CryptoHistory" (
    "id" TEXT NOT NULL,
    "id_crypto" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CryptoHistory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CryptoHistory" ADD CONSTRAINT "CryptoHistory_id_crypto_fkey" FOREIGN KEY ("id_crypto") REFERENCES "Crypto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
