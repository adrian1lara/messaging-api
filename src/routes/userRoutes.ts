import { Router } from "express";
import User from "../models/user";
import { createUser, getUsers } from "../controllers/userController";

const userRouter = Router()


userRouter.get("/api/users", getUsers)


userRouter.post("/api/newUser", createUser)



export default userRouter