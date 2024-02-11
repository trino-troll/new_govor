/*
  Warnings:

  - You are about to drop the `audioFiles` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `audioFiles` DROP FOREIGN KEY `audioFiles_bookId_fkey`;

-- DropTable
DROP TABLE `audioFiles`;
