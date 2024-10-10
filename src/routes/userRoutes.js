import express from "express";
import {
  createCourseTeacher,
  createNewBatch,
  createNewCourse,
  createNewDepartment,
  createNewDepartmentBatch,
  createNewSection,
  createNewSemester,
  createStudentCourseEnrollment,
  createStudentGrade,
  getDepartments,
  getStudents,
  getTeachers,
  getUsers,
  loginUser,
  registerUser,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/getAllUsers", getUsers);
router.get("/getAllTeachers", getTeachers);
router.get("/getAllStudents", getStudents);
router.get("/getAllDepartments", getDepartments);

router.post("/create/department", createNewDepartment);
router.post("/create/batch", createNewBatch);
router.post("/create/semester", createNewSemester);
router.post("/create/section", createNewSection);
router.post("/create/course", createNewCourse);
router.post("/create/dept-batch", createNewDepartmentBatch);
router.post("/create/enrollment", createStudentCourseEnrollment);
router.post("/assign/grade", createStudentGrade);
router.post("/assign/teacher/courses", createCourseTeacher);

router.put("/update/student/id", loginUser);
router.put("/update/teacher/id", loginUser);
// router.delete("/delete/id", loginUser);
// router.post("/assign/student/department", loginUser);
// router.post("/assign/student/batch", loginUser);
// router.post("/assign/student/section", loginUser);

export default router;
