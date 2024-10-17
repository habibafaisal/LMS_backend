import express from "express";
import userRoutes from "./src/routes/userRoutes.js";
import teacherRoutes from "./src/routes/teacherRoutes.js";
import studentRoutes from "./src/routes/studentRoutes.js";
import authroutes from "./src/routes/authroutes.js";
import errorHandler from "./src/middleware/errorHandler.js";

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

// app.use(process.env.BASE_URL, authroutes);
// app.use(process.env.BASE_URL + "/users/admin/", userRoutes);
// app.use(process.env.BASE_URL + "/users/teacher/", teacherRoutes);
// app.use(process.env.BASE_URL + "/users/student/", studentRoutes);

app.use("/api/", authroutes);
app.use("/api/users/admin/", userRoutes);
app.use("/api/users/teacher/", teacherRoutes);
app.use("/api/users/student/", studentRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
