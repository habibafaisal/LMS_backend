// here i will make routes for logged in teacher to update his/her details, check students, grades, courses

import express from "express";
import validateToken from "../middleware/validateTokenHandler.js";
import {
  getStudents,
  getTeacherCourses,
  getTeacherDetails,
  updateTeacherDetails,
} from "../controllers/teacherController.js";

const router = express.Router();

router.get("/getDetails", validateToken, getTeacherDetails);
router.get("/courses", validateToken, getTeacherCourses);

router.get("/getStudents", validateToken, getStudents);
// router.post("/assignGrades", validateToken, assignGrades);

router.patch("/updateDetails", validateToken, updateTeacherDetails);

export default router;
