/*
  Warnings:

  - You are about to drop the column `role` on the `Dish` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Dish" DROP COLUMN "role";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" TEXT DEFAULT E'user';
