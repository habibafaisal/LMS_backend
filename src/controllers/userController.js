import expressAsyncHandler from "express-async-handler";
import {
  assignCourseToTeacher,
  assignGrade,
  createBatch,
  createCourse,
  createDepartment,
  createDepartmentBatch,
  createSection,
  createSemester,
  createUser,
  enrollStudentInCourse,
  getAllAdmins,
  getAllDepartments,
  getAllStudents,
  getAllTeachers,
  getAllUsers,
  login,
  updateStudent,
  updateTeacher,
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

export const createNewCourse = expressAsyncHandler(async (req, res) => {
  const { type, message, statusCode, course } = await createCourse(req.body);
  if (type === "Error") {
    return res.status(statusCode).json({ type, message });
  }
  res.status(statusCode).json({
    type,
    message,
    course,
  });
});

export const createNewDepartmentBatch = expressAsyncHandler(
  async (req, res) => {
    const { type, message, statusCode, deptBatch } =
      await createDepartmentBatch(req.body);
    if (type === "Error") {
      return res.status(statusCode).json({ type, message });
    }
    res.status(statusCode).json({
      type,
      message,
      deptBatch,
    });
  }
);

export const createNewSection = expressAsyncHandler(async (req, res) => {
  const { type, message, statusCode, newSection } = await createSection(
    req.body
  );
  if (type === "Error") {
    return res.status(statusCode).json({ type, message });
  }
  res.status(statusCode).json({
    type,
    message,
    newSection,
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

export const createCourseTeacher = expressAsyncHandler(async (req, res) => {
  const { type, message, statusCode, courseTeacher } =
    await assignCourseToTeacher(req.body);

  if (type === "Error") {
    return res.status(statusCode).json({ type, message });
  }
  res.status(statusCode).json({
    type,
    message,
    courseTeacher,
  });
});

export const getUsers = expressAsyncHandler(async (req, res) => {
  const { type, message, statusCode, users } = await getAllUsers();

  if (type === "Error") {
    return res.status(statusCode).json({ type, message });
  }
  res.status(statusCode).json({
    type,
    message,
    users,
  });
});

export const getAdmins = expressAsyncHandler(async (req, res) => {
  const { type, message, statusCode, admins } = await getAllAdmins();

  if (type === "Error") {
    return res.status(statusCode).json({ type, message });
  }
  res.status(statusCode).json({
    type,
    message,
    admins,
  });
});

export const getTeachers = expressAsyncHandler(async (req, res) => {
  const { type, message, statusCode, teachers } = await getAllTeachers();

  if (type === "Error") {
    return res.status(statusCode).json({ type, message });
  }
  res.status(statusCode).json({
    teachers,
  });
});

export const getStudents = expressAsyncHandler(async (req, res) => {
  const { type, message, statusCode, students } = await getAllStudents();

  if (type === "Error") {
    return res.status(statusCode).json({ type, message });
  }
  res.status(statusCode).json({
    students,
  });
});

export const getDepartments = expressAsyncHandler(async (req, res) => {
  const { type, message, statusCode, departments } = await getAllDepartments();

  if (type === "Error") {
    return res.status(statusCode).json({ type, message });
  }
  res.status(statusCode).json({
    departments,
  });
});

export const updateATeacher = expressAsyncHandler(async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  const { type, message, statusCode, teacher } = await updateTeacher({
    id,
    data,
  });
  if (type === "Error") {
    return res.status(statusCode).json({ type, message });
  }
  res.status(statusCode).json({
    teacher,
  });
});

export const updateAStudent = expressAsyncHandler(async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  const { type, message, statusCode, student } = await updateStudent({
    id,
    data,
  });
  if (type === "Error") {
    return res.status(statusCode).json({ type, message });
  }
  res.status(statusCode).json({
    student,
  });
});
