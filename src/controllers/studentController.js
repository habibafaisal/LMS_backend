import expressAsyncHandler from "express-async-handler";
import { getDetails } from "../services/studentService.js";

export const getStudentDetails = expressAsyncHandler(async (req, res) => {
  console.log("ok", req.user.id);
  const { type, message, statusCode, student } = await getDetails(req.user.id);
  if (type === "Error") {
    return res.status(statusCode).json({ type, message });
  }
  res.status(statusCode).json({
    type,
    message,
    student,
  });
});
