import { Router } from "express";
import { createUser, getUsers } from "../controllers/userController";

const userRouter = Router()


userRouter.get("/all", getUsers)


userRouter.post("/new", createUser)



export default userRouter