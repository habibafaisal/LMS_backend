import jsonwebtoken from "jsonwebtoken";
import prisma from "../db/db.js";
import { comparePasswords } from "../utils/comparePasswords.js";
import { hashPassword } from "../utils/hashPassword.js";
import { constants } from "../utils/constants.js";

export const createUser = async (data) => {
  const { email, password, role } = data;

  const hashedPassword = await hashPassword(password);
  const normalizedRole = role.toUpperCase();

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });
  if (!email || !password || !role) {
    return {
      type: "Error",
      statusCode: constants.VALIDATION_ERROR,
      message: "All fields (email, password, and role) are required.",
    };
  }

  if (existingUser) {
    return {
      type: "Error",
      statusCode: constants.VALIDATION_ERROR,
      message: "Email already exists",
    };
  }

  if (normalizedRole !== "TEACHER" && normalizedRole !== "STUDENT") {
    return {
      type: "Error",
      statusCode: constants.VALIDATION_ERROR,
      message: "Invalid role",
    };
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
  }
  return {
    type: "Success",
    statusCode: 201,
    message: "User created successfully",
    user: newUser,
  };
};

export const login = async (data) => {
  const { email, password } = data;
  if (!email || !password) {
    return {
      type: "Error",
      statusCode: constants.VALIDATION_ERROR,
      message: "All fields (email, password) are required.",
    };
  }
  const user = await prisma.user.findUnique({
    where: { email },
  });
  if (!user) {
    return {
      type: "Error",
      statusCode: constants.NOT_FOUND,
      message: "User not found.",
    };
  }
  const isPasswordValid = await comparePasswords(password, user.password);

  if (!isPasswordValid) {
    return {
      type: "Error",
      statusCode: constants.VALIDATION_ERROR,
      message: "Invalid credentials.",
    };
  }

  const accessToken = jsonwebtoken.sign(
    {
      user: { username: user.username, email: user.email, id: user.id },
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "15m" }
  );
  return {
    type: "Success",
    statusCode: 200,
    user: user,
    message: "Login successful",
    accessToken,
  };
};

export const createDepartment = async (data) => {
  const { department_name } = data;

  if (!department_name) {
    return {
      type: "Error",
      statusCode: constants.VALIDATION_ERROR,
      message: "Department name is required",
    };
  }

  const newDepartment = await prisma.department.create({
    data: { department_name },
  });

  return {
    type: "Success",
    statusCode: 201,
    message: "Department created successfully",
    department: newDepartment,
  };
};

export const createBatch = async (data) => {
  const { batch_year } = data;

  if (!batch_year) {
    return {
      type: "Error",
      statusCode: constants.VALIDATION_ERROR,
      message: "Batch year is required",
    };
  }

  const newBatch = await prisma.batch.create({
    data: { batch_year },
  });

  return {
    type: "Success",
    statusCode: 201,
    message: "Batch created successfully",
    batch: newBatch,
  };
};
