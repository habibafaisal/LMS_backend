import express from "express";
import {
  createNewBatch,
  createNewDepartment,
  loginUser,
  registerUser,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

// dept

router.post("/create/department", createNewDepartment);
router.post("/create/batch", createNewBatch);
// router.post("/create/semester", loginUser);
// router.post("/create/enrollment", loginUser);
// router.post("/assign/grade", loginUser);

// router.post("/assign/teacher/courses", loginUser);
// router.post("/assign/student/courses", loginUser);
// router.delete("/delete/id", loginUser);
// router.put("/update/id", loginUser);
// router.post("/assign/student/department", loginUser);
// router.post("/assign/student/batch", loginUser);
// router.post("/assign/student/section", loginUser);

export default router;
