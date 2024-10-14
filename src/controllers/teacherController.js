import { getDetails } from "../services/teacherService.js";
import expressAsyncHandler from "express-async-handler";

export const getTeacherDetails = expressAsyncHandler(async (req, res) => {
  const { type, message, statusCode, teacher } = await getDetails(req.user.id);
  if (type === "Error") {
    return res.status(statusCode).json({ type, message });
  }
  res.status(statusCode).json({
    type,
    message,
    teacher,
  });
});
