import expressAsyncHandler from "express-async-handler";
import {
  assignGrade,
  createBatch,
  createDepartment,
  createSemester,
  createUser,
  enrollStudentInCourse,
  login,
} from "../services/userService.js";

export const registerUser = expressAsyncHandler(async (req, res) => {
  const { type, message, statusCode, user } = await createUser(req.body);

  if (type === "Error") {
    return res.status(statusCode).json({ type, message });
  }

  res.status(statusCode).json({
    type,
    message,
    user,
  });
});

export const loginUser = expressAsyncHandler(async (req, res) => {
  const { type, message, statusCode, user, accessToken } = await login(
    req.body
  );
  if (type === "Error") {
    return res.status(statusCode).json({ type, message });
  }
  res.status(statusCode).json({
    type,
    message,
    user,
    accessToken,
  });
});

export const createNewDepartment = expressAsyncHandler(async (req, res) => {
  const { type, message, statusCode, department } = await createDepartment(
    req.body
  );
  if (type === "Error") {
    return res.status(statusCode).json({ type, message });
  }
  res.status(statusCode).json({
    type,
    message,
    department,
  });
});

export const createNewBatch = expressAsyncHandler(async (req, res) => {
  const { type, message, statusCode, batch } = await createBatch(req.body);
  if (type === "Error") {
    return res.status(statusCode).json({ type, message });
  }
  res.status(statusCode).json({
    type,
    message,
    batch,
  });
});

export const createNewSemester = expressAsyncHandler(async (req, res) => {
  const { type, message, statusCode, semester } = await createSemester(
    req.body
  );
  if (type === "Error") {
    return res.status(statusCode).json({ type, message });
  }
  res.status(statusCode).json({
    type,
    message,
    semester,
  });
});

export const createStudentCourseEnrollment = expressAsyncHandler(
  async (req, res) => {
    const { type, message, statusCode, newEnrollment } =
      await enrollStudentInCourse(req.body);
    if (type === "Error") {
      return res.status(statusCode).json({ type, message });
    }
    res.status(statusCode).json({
      type,
      message,
      newEnrollment,
    });
  }
);

export const createStudentGrade = expressAsyncHandler(async (req, res) => {
  const { type, message, statusCode, grade } = await assignGrade(req.body);
  if (type === "Error") {
    return res.status(statusCode).json({ type, message });
  }
  res.status(statusCode).json({
    type,
    message,
    grade,
  });
});
