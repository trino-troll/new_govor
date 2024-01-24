/*
  Warnings:

  - You are about to drop the column `image_url` on the `books` table. All the data in the column will be lost.
  - Added the required column `imageUrl` to the `books` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `books` DROP COLUMN `image_url`,
    ADD COLUMN `imageUrl` VARCHAR(191) NOT NULL;
