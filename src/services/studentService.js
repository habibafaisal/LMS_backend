import prisma from "../db/db.js";
import { constants } from "../utils/constants.js";

export const getDetails = async (userId) => {
  console.log({ userId });
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
export const getEnrollments = async () => {};
export const getGrades = async () => {};
