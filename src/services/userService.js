import prisma from "../db/db";
import { hashPassword } from "../utils/hashPassword";

export const createUser = async (data) => {
  const { email, password, role } = data;
  const hashedPassword = await hashPassword(password);
  const normalizedRole = role.toLowerCase();

  const newUser = await prisma.user.create({
    data: { email, password: hashedPassword, role: normalizedRole },
  });
  if (normalizedRole === "teacher") {
    await prisma.teacher.create({
      data: {
        user_id: newUser.user_id,
        first_name: null,
        last_name: null,
        department_id: null,
      },
    });
  } else if (normalizedRole === "student") {
    await prisma.student.create({
      data: {
        user_id: newUser.user_id,
        first_name: null,
        last_name: null,
        department_id: null,
        batch_id: null,
        section_id: null,
        admission_date: null,
      },
    });
  } else {
    throw new Error("Invalid role");
  }
  return newUser;
};
