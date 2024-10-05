import jsonwebtoken from "jsonwebtoken";
import prisma from "../db/db.js";
import { comparePasswords } from "../utils/comparePasswords.js";
import { hashPassword } from "../utils/hashPassword.js";

export const createUser = async (data) => {
  const { email, password, role } = data;
  const hashedPassword = await hashPassword(password);
  const normalizedRole = role.toUpperCase();

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });
  if (existingUser) {
    throw new Error("Email already exists");
  }

  const newUser = await prisma.user.create({
    data: { email, password: hashedPassword, role: normalizedRole },
  });
  if (normalizedRole === "TEACHER") {
    await prisma.teacher.create({
      data: {
        user_id: newUser.user_id,
      },
    });
  } else if (normalizedRole === "STUDENT") {
    await prisma.student.create({
      data: {
        user_id: newUser.user_id,
      },
    });
  } else {
    throw new Error("Invalid role");
  }
  return newUser;
};

export const login = async (data) => {
  const { email, password } = data;
  if (!email || !password) {
    throw new Error("All fields are required");
  }
  const user = await prisma.user.findUnique({
    where: { email },
  });
  if (!user) {
    throw new Error("User not found");
  }
  const isPasswordValid = await comparePasswords(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid email or password");
  }

  const accessToken = jsonwebtoken.sign(
    {
      user: { username: user.username, email: user.email, id: user.id },
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "15m" }
  );
  return accessToken;
};
