import prisma from "../db/db.js";
import { constants } from "../utils/constants.js";

export const getDetails = async (userId) => {
  const student = await prisma.student.findUnique({
    where: {
      user_id: userId,
    },
    include: {
      user: true,
      department: true,
      batch: true,
      section: true,
    },
  });

  if (!student) {
    return {
      type: "Error",
      statusCode: constants.NOT_FOUND,
      message: "Not found",
    };
  }
  return {
    type: "Success",
    statusCode: 200,
    student,
  };
};
export const getEnrollments = async (userId) => {
  const enrollments = await prisma.enrollment.findFirst({
    where: {
      student: {
        user_id: userId,
      },
    },
  });
  if (!enrollments || enrollments.length === 0) {
    return {
      type: "Error",
      statusCode: constants.NOT_FOUND,
      message: "Not enrollments found",
    };
  }
  return {
    type: "Success",
    statusCode: 200,
    enrollments,
  };
};
export const getGrades = async (userId) => {
  const grades = await prisma.grade.findUnique({
    where: {
      student: {
        user_id: userId,
      },
    },
  });
  if (!grades || grades.length === 0) {
    return {
      type: "Error",
      statusCode: constants.NOT_FOUND,
      message: "Not grades found",
    };
  }
  return {
    type: "Success",
    statusCode: 200,
    grades,
  };
};

export const updateDetails = async (userId, updatedData) => {
  const student = await prisma.student.update({
    where: {
      user_id: userId,
    },
    data: { ...updatedData },
  });

  if (!student) {
    return {
      type: "Error",
      statusCode: constants.NOT_FOUND,
      message: "Student not found",
    };
  }
  return {
    type: "Success",
    message: "Student details updated",
    statusCode: 200,
    student,
  };
};
