/*
  Warnings:

  - A unique constraint covering the columns `[city]` on the table `City` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "City" ALTER COLUMN "areas" SET DEFAULT ARRAY[]::TEXT[];

-- CreateIndex
CREATE UNIQUE INDEX "City_city_key" ON "City"("city");
