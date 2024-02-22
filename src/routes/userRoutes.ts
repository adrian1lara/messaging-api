import { Router } from "express";
import { createUser, deleteUserByAdmin, getUser, getUsers, loginUser } from "../controllers/userController";
import { authenticate } from "../middlewares/auth";
import isAdmin from "../middlewares/admin";

const userRouter = Router()


userRouter.get("/all", getUsers)


userRouter.get("/:id", authenticate, getUser)

userRouter.post("/new", createUser)

userRouter.post("/auth/login", loginUser)

userRouter.delete("/auth/delete/:userId", authenticate, isAdmin, deleteUserByAdmin)




export default userRouter