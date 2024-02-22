import { Router } from "express";
import { createUser, getUser, getUsers, loginUser } from "../controllers/userController";
import { authenticate } from "../middlewares/auth";

const userRouter = Router()


userRouter.get("/all", getUsers)


userRouter.post("/new", createUser)

userRouter.post("/auth/login", loginUser)

userRouter.get("/:id", authenticate, getUser)

export default userRouter