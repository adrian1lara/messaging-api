import { Router } from "express";
import User from "../models/user";
import { createUser } from "../controllers/userController";

const userRouter = Router()

userRouter.post("/api/newUser", createUser)


export default userRouter