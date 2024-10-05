import expressAsyncHandler from "express-async-handler";
import { createUser, login } from "../services/userService.js";

export const registerUser = expressAsyncHandler(async (req, res) => {
  const userData = req.body;
  const newUser = await createUser(userData);
  console.log("user_id", newUser.user_id);
  res.status(201).json({ message: "success" });
});

export const loginUser = expressAsyncHandler(async (req, res) => {
  const userData = req.body;
  const user = await login(userData);
  res.status(200).json({ user });
});
