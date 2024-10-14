// here i will make routes for logged in teacher to update his/her details, check students, grades, courses

import express from "express";
import validateToken from "../middleware/validateTokenHandler.js";
import { getTeacherDetails } from "../controllers/teacherController.js";

const router = express.Router();

router.get("/getDetails", validateToken, getTeacherDetails);
// router.get("/getEnrollments", validateToken, getStudentEnrollments);
// router.get("/getGrades", validateToken, getStudentGrades);

// router.patch("/updateDetails", validateToken, updateStudentDetails);

export default router;
