import { Router } from "express";
import { createChat, deleteAllChats, getChatByUserId, getChats, getUserChats } from "../controllers/chatController";
import { authenticate } from "../middlewares/auth";
import isAdmin from "../middlewares/admin";

const chatRouter = Router()

chatRouter.post("/new", createChat)

chatRouter.get("/all", authenticate, getChats)

chatRouter.get("/:userId/chats", authenticate, getUserChats)

chatRouter.get("/user", authenticate, getChatByUserId)

chatRouter.delete("/delete/all", deleteAllChats)

export default chatRouter