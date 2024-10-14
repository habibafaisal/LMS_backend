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
