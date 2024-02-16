import { Router } from "express";
import User from "../models/user";
import { createUser, getUsers } from "../controllers/userController";

const userRouter = Router()


userRouter.get("/users", getUsers)


userRouter.post("/newUser", createUser)



export default userRouter