// here i will make routes for logged in student to update his/her details, check enrollments, grades,courses

import express from "express";
import { getStudentDetails } from "../controllers/studentController.js";
import validateToken from "../middleware/validateTokenHandler.js";

const router = express.Router();

router.get("/getDetails", validateToken, getStudentDetails);
// router.get("/getEnrollments", getStudents);
// router.get("/getGrades", getStudents);

export default router;
