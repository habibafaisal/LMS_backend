import {
  getCourses,
  getDetails,
  getMyStudents,
  updateDetails,
} from "../services/teacherService.js";
import expressAsyncHandler from "express-async-handler";

export const getTeacherDetails = expressAsyncHandler(async (req, res) => {
  const { type, message, statusCode, teacher } = await getDetails(req.user.id);
  if (type === "Error") {
    return res.status(statusCode).json({ type, message });
  }
  res.status(statusCode).json({
    type,
    message,
    teacher,
  });
});

export const updateTeacherDetails = expressAsyncHandler(async (req, res) => {
  const id = req.user.id;
  const updatedData = req.body;

  const { type, message, statusCode, teacher } = await updateDetails(
    id,
    updatedData
  );
  if (type === "Error") {
    return res.status(statusCode).json({ type, message });
  }
  res.status(statusCode).json({
    type,
    message,
    teacher,
  });
});

export const getTeacherCourses = expressAsyncHandler(async (req, res) => {
  const id = req.user.id;

  const { type, message, statusCode, courses } = await getCourses(id);
  if (type === "Error") {
    return res.status(statusCode).json({ type, message });
  }
  res.status(statusCode).json({
    type,
    message,
    courses,
  });
});

export const getStudents = expressAsyncHandler(async (req, res) => {
  const id = req.user.id;

  const { type, message, statusCode, students } = await getMyStudents(id);
  if (type === "Error") {
    return res.status(statusCode).json({ type, message });
  }
  res.status(statusCode).json({
    type,
    message,
    students,
  });
});

// export const assignGrades = expressAsyncHandler(async (req, res) => {
//   const id = req.user.id;

//   const { type, message, statusCode, data } = await assignGradesToStudent(id);
//   if (type === "Error") {
//     return res.status(statusCode).json({ type, message });
//   }
//   res.status(statusCode).json({
//     type,
//     message,
//     data,
//   });
// });
