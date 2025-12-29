-- CreateTable
CREATE TABLE "FavoriteAgent" (
    "id" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "agentUuid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FavoriteAgent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FavoriteAgent_userId_agentUuid_key" ON "FavoriteAgent"("userId", "agentUuid");

-- AddForeignKey
ALTER TABLE "FavoriteAgent" ADD CONSTRAINT "FavoriteAgent_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
