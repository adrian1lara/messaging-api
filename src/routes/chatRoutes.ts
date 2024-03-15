import { Router } from "express";
import { createChat, deleteAllChats, getChatByUserId, getChats, getUserChats } from "../controllers/chatController";
import { authenticate } from "../middlewares/auth";
import isAdmin from "../middlewares/admin";

const chatRouter = Router()

chatRouter.post("/new", authenticate,createChat)

chatRouter.get("/all", authenticate, isAdmin, getChats)

chatRouter.get("/:userId/chats", authenticate, getUserChats)

chatRouter.get("/user", authenticate, getChatByUserId)

chatRouter.delete("/delete/all", authenticate, isAdmin, deleteAllChats)

export default chatRouter