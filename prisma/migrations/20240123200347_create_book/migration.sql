/*
  Warnings:

  - Added the required column `chtecId` to the `books` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `books` ADD COLUMN `chtecId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `_authorsTobooks` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_authorsTobooks_AB_unique`(`A`, `B`),
    INDEX `_authorsTobooks_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `books` ADD CONSTRAINT `books_chtecId_fkey` FOREIGN KEY (`chtecId`) REFERENCES `chtecs`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_authorsTobooks` ADD CONSTRAINT `_authorsTobooks_A_fkey` FOREIGN KEY (`A`) REFERENCES `authors`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_authorsTobooks` ADD CONSTRAINT `_authorsTobooks_B_fkey` FOREIGN KEY (`B`) REFERENCES `books`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
