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
  getAdmins,
  getDepartments,
  getStudents,
  getTeachers,
  getUsers,
  loginUser,
  registerUser,
  updateAStudent,
  updateATeacher,
} from "../controllers/userController.js";
import validateToken from "../middleware/validateTokenHandler.js";
import checkRole from "../middleware/rbac.js";

const router = express.Router();

// router.post("/register", registerUser);
// router.post("/login", loginUser);

router.get("/getAllUsers", validateToken, checkRole(["ADMIN"]), getUsers);
router.get("/getAllTeachers", validateToken, checkRole(["ADMIN"]), getTeachers);
router.get("/getAllAdmin", getAdmins);
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

router.put("/update/student/:id", updateAStudent);
router.put("/update/teacher/:id", updateATeacher);

// router.delete("/delete/id", loginUser);

export default router;
