/*
  Warnings:

  - Added the required column `name` to the `Membership` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Membership" ADD COLUMN     "name" TEXT NOT NULL;
