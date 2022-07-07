/*
  Warnings:

  - You are about to drop the `_DishToLocality` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_DishToLocality" DROP CONSTRAINT "_DishToLocality_A_fkey";

-- DropForeignKey
ALTER TABLE "_DishToLocality" DROP CONSTRAINT "_DishToLocality_B_fkey";

-- AlterTable
ALTER TABLE "Dish" ADD COLUMN     "image" TEXT,
ALTER COLUMN "localityId" DROP NOT NULL;

-- DropTable
DROP TABLE "_DishToLocality";

-- AddForeignKey
ALTER TABLE "Dish" ADD CONSTRAINT "Dish_localityId_fkey" FOREIGN KEY ("localityId") REFERENCES "Locality"("id") ON DELETE SET NULL ON UPDATE CASCADE;
