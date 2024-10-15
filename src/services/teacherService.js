import prisma from "../db/db.js";
import { constants } from "../utils/constants.js";

export const getDetails = async (userId) => {
  const teacher = await prisma.teacher.findUnique({
    where: {
      user_id: userId,
    },
    include: {
      user: true,
      department: true,
      teacher_courses: true,
    },
  });

  if (!teacher) {
    return {
      type: "Error",
      statusCode: constants.NOT_FOUND,
      message: "Not found",
    };
  }
  return {
    type: "Success",
    statusCode: 200,
    teacher,
  };
};

export const updateDetails = async (userId, updatedData) => {
  const teacher = await prisma.teacher.update({
    where: {
      user_id: userId,
    },
    data: { ...updatedData },
  });

  if (!teacher) {
    return {
      type: "Error",
      statusCode: constants.NOT_FOUND,
      message: "teacher not found",
    };
  }
  return {
    type: "Success",
    message: "Teacher details updated",
    statusCode: 200,
    teacher,
  };
};

export const getCourses = async (userId) => {
  const teacherCourses = await prisma.teacher.findUnique({
    where: {
      user_id: userId,
    },
    include: {
      teacher_courses: {
        include: {
          course: true,
        },
      },
    },
  });

  if (!teacherCourses) {
    return {
      type: "Error",
      statusCode: constants.NOT_FOUND,
      message: "Not found",
    };
  }

  return {
    type: "Success",
    statusCode: 200,
    courses: teacherCourses.teacher_courses,
  };
};
