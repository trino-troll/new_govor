/*
  Warnings:

  - You are about to drop the column `genreId` on the `books` table. All the data in the column will be lost.
  - You are about to drop the `genres` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `books` DROP FOREIGN KEY `books_genreId_fkey`;

-- AlterTable
ALTER TABLE `books` DROP COLUMN `genreId`;

-- DropTable
DROP TABLE `genres`;
