import { Router } from "express";
import { getAllUser, getUserById } from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.get("/users", getAllUser);
userRouter.get("/users/:id", getUserById);

export default userRouter;
