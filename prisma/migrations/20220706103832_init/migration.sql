/*
  Warnings:

  - Made the column `localityId` on table `Dish` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Dish" DROP CONSTRAINT "Dish_localityId_fkey";

-- AlterTable
ALTER TABLE "Dish" ALTER COLUMN "quantity_sold" DROP NOT NULL,
ALTER COLUMN "quantity_sold" SET DEFAULT 0,
ALTER COLUMN "localityId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Dish" ADD CONSTRAINT "Dish_localityId_fkey" FOREIGN KEY ("localityId") REFERENCES "AddLocality"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
