import expressAsyncHandler from "express-async-handler";
import {
  createDepartment,
  createUser,
  login,
} from "../services/userService.js";

export const registerUser = expressAsyncHandler(async (req, res) => {
  const { type, message, statusCode, user } = await createUser(req.body);

  if (type === "Error") {
    return res.status(statusCode).json({ type, message });
  }

  res.status(statusCode).json({
    type,
    message,
    user,
  });
});

export const loginUser = expressAsyncHandler(async (req, res) => {
  const { type, message, statusCode, user, accessToken } = await login(
    req.body
  );
  if (type === "Error") {
    return res.status(statusCode).json({ type, message });
  }
  res.status(statusCode).json({
    type,
    message,
    user,
    accessToken,
  });
});

export const createNewDepartment = expressAsyncHandler(async (req, res) => {
  const { type, message, statusCode, department } = await createDepartment(
    req.body
  );
  if (type === "Error") {
    return res.status(statusCode).json({ type, message });
  }
  res.status(statusCode).json({
    type,
    message,
    department,
  });
});
