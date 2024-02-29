import { Router } from "express";
import { createUser, deleteUserAccount, deleteUserByAdmin, getUserByToken, getUsers, loginUser } from "../controllers/userController";
import { authenticate } from "../middlewares/auth";
import isAdmin from "../middlewares/admin";

const userRouter = Router()


userRouter.get("/all", getUsers)


userRouter.get("/auth/me", authenticate, getUserByToken)

userRouter.post("/new", createUser)

userRouter.post("/auth/login", loginUser)

userRouter.delete("/auth/delete/:userId", authenticate, isAdmin, deleteUserByAdmin)

userRouter.delete("/auth/account/delete/:userId", authenticate, deleteUserAccount)


export default userRouter