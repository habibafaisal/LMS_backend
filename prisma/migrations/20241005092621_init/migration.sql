-- CreateTable
CREATE TABLE `User` (
    `user_id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(100) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `role` ENUM('ADMIN', 'TEACHER', 'STUDET') NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Teacher` (
    `teacher_id` INTEGER NOT NULL AUTO_INCREMENT,
    `first_name` VARCHAR(100) NOT NULL,
    `last_name` VARCHAR(100) NOT NULL,
    `department_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,

    UNIQUE INDEX `Teacher_user_id_key`(`user_id`),
    PRIMARY KEY (`teacher_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Student` (
    `student_id` INTEGER NOT NULL AUTO_INCREMENT,
    `first_name` VARCHAR(100) NOT NULL,
    `last_name` VARCHAR(100) NOT NULL,
    `phone_number` VARCHAR(15) NOT NULL,
    `department_id` INTEGER NOT NULL,
    `batch_id` INTEGER NOT NULL,
    `section_id` INTEGER NOT NULL,
    `admission_date` DATETIME(3) NOT NULL,
    `user_id` INTEGER NOT NULL,

    UNIQUE INDEX `Student_user_id_key`(`user_id`),
    PRIMARY KEY (`student_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Department` (
    `department_id` INTEGER NOT NULL AUTO_INCREMENT,
    `department_name` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`department_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Batch` (
    `batch_id` INTEGER NOT NULL AUTO_INCREMENT,
    `batch_year` INTEGER NOT NULL,

    PRIMARY KEY (`batch_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Department_Batch` (
    `dept_batch_id` INTEGER NOT NULL AUTO_INCREMENT,
    `department_id` INTEGER NOT NULL,
    `batch_id` INTEGER NOT NULL,

    PRIMARY KEY (`dept_batch_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Section` (
    `section_id` INTEGER NOT NULL AUTO_INCREMENT,
    `section_name` VARCHAR(10) NOT NULL,
    `dept_batch_id` INTEGER NOT NULL,

    PRIMARY KEY (`section_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Course` (
    `course_id` INTEGER NOT NULL AUTO_INCREMENT,
    `course_name` VARCHAR(100) NOT NULL,
    `course_code` VARCHAR(100) NOT NULL,
    `credit_hours` INTEGER NOT NULL,
    `dept_id` INTEGER NOT NULL,

    PRIMARY KEY (`course_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Teacher_Course` (
    `teacher_course_id` INTEGER NOT NULL AUTO_INCREMENT,
    `teacher_id` INTEGER NOT NULL,
    `course_id` INTEGER NOT NULL,

    PRIMARY KEY (`teacher_course_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Semester` (
    `semester_id` INTEGER NOT NULL AUTO_INCREMENT,
    `semester_name` VARCHAR(100) NOT NULL,
    `start_date` DATETIME(3) NOT NULL,
    `end_date` DATETIME(3) NOT NULL,

    PRIMARY KEY (`semester_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Enrollment` (
    `enrollment_id` INTEGER NOT NULL AUTO_INCREMENT,
    `student_id` INTEGER NOT NULL,
    `course_id` INTEGER NOT NULL,
    `semester_id` INTEGER NOT NULL,
    `enrollment_date` DATETIME(3) NOT NULL,

    PRIMARY KEY (`enrollment_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Grade` (
    `grade_id` INTEGER NOT NULL AUTO_INCREMENT,
    `student_id` INTEGER NOT NULL,
    `course_id` INTEGER NOT NULL,
    `semester_id` INTEGER NOT NULL,
    `grade` VARCHAR(5) NOT NULL,

    PRIMARY KEY (`grade_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Teacher` ADD CONSTRAINT `Teacher_department_id_fkey` FOREIGN KEY (`department_id`) REFERENCES `Department`(`department_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Teacher` ADD CONSTRAINT `Teacher_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Student` ADD CONSTRAINT `Student_department_id_fkey` FOREIGN KEY (`department_id`) REFERENCES `Department`(`department_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Student` ADD CONSTRAINT `Student_batch_id_fkey` FOREIGN KEY (`batch_id`) REFERENCES `Batch`(`batch_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Student` ADD CONSTRAINT `Student_section_id_fkey` FOREIGN KEY (`section_id`) REFERENCES `Section`(`section_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Student` ADD CONSTRAINT `Student_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Department_Batch` ADD CONSTRAINT `Department_Batch_department_id_fkey` FOREIGN KEY (`department_id`) REFERENCES `Department`(`department_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Department_Batch` ADD CONSTRAINT `Department_Batch_batch_id_fkey` FOREIGN KEY (`batch_id`) REFERENCES `Batch`(`batch_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Section` ADD CONSTRAINT `Section_dept_batch_id_fkey` FOREIGN KEY (`dept_batch_id`) REFERENCES `Department_Batch`(`dept_batch_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Course` ADD CONSTRAINT `Course_dept_id_fkey` FOREIGN KEY (`dept_id`) REFERENCES `Department`(`department_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Teacher_Course` ADD CONSTRAINT `Teacher_Course_teacher_id_fkey` FOREIGN KEY (`teacher_id`) REFERENCES `Teacher`(`teacher_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Teacher_Course` ADD CONSTRAINT `Teacher_Course_course_id_fkey` FOREIGN KEY (`course_id`) REFERENCES `Course`(`course_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Enrollment` ADD CONSTRAINT `Enrollment_student_id_fkey` FOREIGN KEY (`student_id`) REFERENCES `Student`(`student_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Enrollment` ADD CONSTRAINT `Enrollment_course_id_fkey` FOREIGN KEY (`course_id`) REFERENCES `Course`(`course_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Enrollment` ADD CONSTRAINT `Enrollment_semester_id_fkey` FOREIGN KEY (`semester_id`) REFERENCES `Semester`(`semester_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Grade` ADD CONSTRAINT `Grade_student_id_fkey` FOREIGN KEY (`student_id`) REFERENCES `Student`(`student_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Grade` ADD CONSTRAINT `Grade_course_id_fkey` FOREIGN KEY (`course_id`) REFERENCES `Course`(`course_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Grade` ADD CONSTRAINT `Grade_semester_id_fkey` FOREIGN KEY (`semester_id`) REFERENCES `Semester`(`semester_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
