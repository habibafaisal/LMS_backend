import express from "express";
import userRoutes from "./src/routes/userRoutes.js";
import teacherRoutes from "./src/routes/teacherRoutes.js";
import studentRoutes from "./src/routes/studentRoutes.js";
import authRoutes from "./src/routes/authRoutes.js";
import errorHandler from "./src/middleware/errorHandler.js";

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

app.use("/api/", authRoutes);
app.use("/api/users/admin/", userRoutes);
app.use("/api/users/teacher/", teacherRoutes);
app.use("/api/users/student/", studentRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
