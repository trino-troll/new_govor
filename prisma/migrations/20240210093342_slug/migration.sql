/*
  Warnings:

  - Made the column `slug` on table `books` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `books` MODIFY `slug` VARCHAR(191) NOT NULL;
