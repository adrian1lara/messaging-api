import { Router } from "express";
import { createUser_Chat } from "../controllers/user_chatController";

const user_chatRouter = Router()

user_chatRouter.post("/newUser_Chat", createUser_Chat)

export default user_chatRouter