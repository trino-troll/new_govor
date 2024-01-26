/*
  Warnings:

  - You are about to drop the `_authorsTobooks` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `authorID` to the `books` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `_authorsTobooks` DROP FOREIGN KEY `_authorsTobooks_A_fkey`;

-- DropForeignKey
ALTER TABLE `_authorsTobooks` DROP FOREIGN KEY `_authorsTobooks_B_fkey`;

-- AlterTable
ALTER TABLE `books` ADD COLUMN `authorID` INTEGER NOT NULL;

-- DropTable
DROP TABLE `_authorsTobooks`;

-- AddForeignKey
ALTER TABLE `books` ADD CONSTRAINT `books_authorID_fkey` FOREIGN KEY (`authorID`) REFERENCES `authors`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
