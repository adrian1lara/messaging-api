import { Router } from "express";
import { createChat, getChats, getUserChats } from "../controllers/chatController";
import { authenticate } from "../middlewares/auth";

const chatRouter = Router()

chatRouter.post("/new", createChat)

chatRouter.get("/all", getChats)

chatRouter.get("/:userId/chats", authenticate, getUserChats)

export default chatRouter