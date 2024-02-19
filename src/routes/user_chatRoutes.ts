import { Router } from "express";
import { createUser_Chat, getUser_Chat } from "../controllers/user_chatController";

const user_chatRouter = Router()

user_chatRouter.post("/new", createUser_Chat)

user_chatRouter.get("/all", getUser_Chat)

export default user_chatRouter