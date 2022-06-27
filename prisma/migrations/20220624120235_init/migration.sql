/*
  Warnings:

  - A unique constraint covering the columns `[authorId]` on the table `TokenPair` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "TokenPair_authorId_key" ON "TokenPair"("authorId");
