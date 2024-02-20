import { Router } from "express";
import { createUser, getUsers, loginUser } from "../controllers/userController";

const userRouter = Router()


userRouter.get("/all", getUsers)


userRouter.post("/new", createUser)

userRouter.post("/auth/login", loginUser)



export default userRouter