import expressAsyncHandler from "express-async-handler";
import {
  getDetails,
  getEnrollments,
  getGrades,
} from "../services/studentService.js";

export const getStudentDetails = expressAsyncHandler(async (req, res) => {
  const { type, message, statusCode, student } = await getDetails(req.user.id);
  if (type === "Error") {
    return res.status(statusCode).json({ type, message });
  }
  res.status(statusCode).json({
    type,
    message,
    student,
  });
});

export const getStudentEnrollments = expressAsyncHandler(async (req, res) => {
  const { type, message, statusCode, enrollments } = await getEnrollments(
    req.user.id
  );
  if (type === "Error") {
    return res.status(statusCode).json({ type, message });
  }
  res.status(statusCode).json({
    type,
    message,
    enrollments,
  });
});

export const getStudentGrades = expressAsyncHandler(async (req, res) => {
  const { type, message, statusCode, grades } = await getGrades(req.user.id);
  if (type === "Error") {
    return res.status(statusCode).json({ type, message });
  }
  res.status(statusCode).json({
    type,
    message,
    grades,
  });
});
