/*
  Warnings:

  - You are about to drop the `_booksTogenres` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_booksTogenres` DROP FOREIGN KEY `_booksTogenres_A_fkey`;

-- DropForeignKey
ALTER TABLE `_booksTogenres` DROP FOREIGN KEY `_booksTogenres_B_fkey`;

-- AlterTable
ALTER TABLE `books` ADD COLUMN `genreId` INTEGER NULL;

-- DropTable
DROP TABLE `_booksTogenres`;

-- AddForeignKey
ALTER TABLE `books` ADD CONSTRAINT `books_genreId_fkey` FOREIGN KEY (`genreId`) REFERENCES `genres`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
