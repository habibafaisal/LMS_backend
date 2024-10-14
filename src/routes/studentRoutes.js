// here i will make routes for logged in student to update his/her details, check enrollments, grades,courses

import express from "express";
import {
  getStudentDetails,
  getStudentEnrollments,
  getStudentGrades,
  updateStudentDetails,
} from "../controllers/studentController.js";
import validateToken from "../middleware/validateTokenHandler.js";

const router = express.Router();

router.get("/getDetails", validateToken, getStudentDetails);
router.get("/getEnrollments", validateToken, getStudentEnrollments);
router.get("/getGrades", validateToken, getStudentGrades);

router.patch("/updateDetails", validateToken, updateStudentDetails);

export default router;
