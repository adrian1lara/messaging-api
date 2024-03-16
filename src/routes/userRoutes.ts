import { Router } from "express";
import { createUser, deleteUserAccount, deleteUserByAdmin, findUserByUsername, getUserByToken, getUsers, loginUser } from "../controllers/userController";
import { authenticate } from "../middlewares/auth";
import isAdmin from "../middlewares/admin";
import limitUsers from "../middlewares/limitUsers";

const userRouter = Router()


userRouter.get("/all", authenticate, getUsers)

userRouter.get("/search/username", findUserByUsername)

userRouter.get("/auth/me", authenticate, getUserByToken)

userRouter.post("/new", limitUsers, createUser)

userRouter.post("/auth/login", loginUser)

userRouter.delete("/auth/delete/:userId", authenticate, isAdmin, deleteUserByAdmin)

userRouter.delete("/auth/account/delete/:userId", authenticate, deleteUserAccount)


export default userRouter