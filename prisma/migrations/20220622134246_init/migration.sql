-- CreateTable
CREATE TABLE "TokenPair" (
    "id" SERIAL NOT NULL,
    "accessToken" TEXT NOT NULL,
    "refreshToken" TEXT NOT NULL,
    "authorId" INTEGER,

    CONSTRAINT "TokenPair_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TokenPair" ADD CONSTRAINT "TokenPair_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
