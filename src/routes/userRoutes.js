import express from "express";
import {
  courseById,
  createCourseTeacher,
  createNewBatch,
  createNewCourse,
  createNewDepartment,
  createNewDepartmentBatch,
  createNewSection,
  createNewSemester,
  createStudentCourseEnrollment,
  createStudentGrade,
  deleteEnrollment,
  deleteUser,
  departmentById,
  getAdmins,
  getCourses,
  getDepartments,
  getStudents,
  getTeachers,
  getUsers,
  loginUser,
  registerUser,
  studentById,
  teacherById,
  updateAStudent,
  updateATeacher,
} from "../controllers/userController.js";
import validateToken from "../middleware/validateTokenHandler.js";
import checkRole from "../middleware/rbac.js";

const router = express.Router();

router.get("/getAllUsers", getUsers);
router.get("/getAllTeachers", getTeachers);
// router.get("/getAllTeachers", validateToken, checkRole(["ADMIN"]), getTeachers);
router.get("/getAllAdmin", checkRole(["ADMIN"]), getAdmins);
router.get("/getAllStudents", getStudents);
router.get("/getAllDepartments", getDepartments);
router.get("/getAllCourses", getCourses);

router.get("/getDepartmentById/:id", departmentById);
router.get("/getTeacherById/:id", teacherById);
router.get("/getCourseById/:id", courseById);
router.get("/getStudentById/:id", studentById);

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

router.delete("/delete/:id", deleteUser);
router.delete("/delete/enrollment/:id", deleteEnrollment);

export default router;
