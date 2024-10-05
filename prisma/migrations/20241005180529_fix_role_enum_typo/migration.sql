/*
  Warnings:

  - The values [STUDET] on the enum `User_role` will be removed. If these variants are still used in the database, this will fail.

*/
-- DropForeignKey
ALTER TABLE `student` DROP FOREIGN KEY `Student_batch_id_fkey`;

-- DropForeignKey
ALTER TABLE `student` DROP FOREIGN KEY `Student_department_id_fkey`;

-- DropForeignKey
ALTER TABLE `student` DROP FOREIGN KEY `Student_section_id_fkey`;

-- DropForeignKey
ALTER TABLE `teacher` DROP FOREIGN KEY `Teacher_department_id_fkey`;

-- AlterTable
ALTER TABLE `student` MODIFY `first_name` VARCHAR(100) NULL,
    MODIFY `last_name` VARCHAR(100) NULL,
    MODIFY `phone_number` VARCHAR(15) NULL,
    MODIFY `department_id` INTEGER NULL,
    MODIFY `batch_id` INTEGER NULL,
    MODIFY `section_id` INTEGER NULL,
    MODIFY `admission_date` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `teacher` MODIFY `first_name` VARCHAR(100) NULL,
    MODIFY `last_name` VARCHAR(100) NULL,
    MODIFY `department_id` INTEGER NULL;

-- AlterTable
ALTER TABLE `user` MODIFY `role` ENUM('ADMIN', 'TEACHER', 'STUDENT') NOT NULL;

-- AddForeignKey
ALTER TABLE `Teacher` ADD CONSTRAINT `Teacher_department_id_fkey` FOREIGN KEY (`department_id`) REFERENCES `Department`(`department_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Student` ADD CONSTRAINT `Student_department_id_fkey` FOREIGN KEY (`department_id`) REFERENCES `Department`(`department_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Student` ADD CONSTRAINT `Student_batch_id_fkey` FOREIGN KEY (`batch_id`) REFERENCES `Batch`(`batch_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Student` ADD CONSTRAINT `Student_section_id_fkey` FOREIGN KEY (`section_id`) REFERENCES `Section`(`section_id`) ON DELETE SET NULL ON UPDATE CASCADE;
