/*
  Warnings:

  - You are about to alter the column `service_time` on the `Reservation` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Reservation" ALTER COLUMN "service_time" SET DATA TYPE INTEGER;
