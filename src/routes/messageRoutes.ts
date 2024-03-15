import { Router } from "express";
import { sendMessage, getMessagesInChat, getAllMessages, deleteAllMessages } from "../controllers/messageController";
import { authenticate } from "../middlewares/auth";
import isAdmin from "../middlewares/admin";

const messageRouter = Router()

messageRouter.post("/:chatId/new", authenticate, sendMessage)

messageRouter.get("/:chatId/messages", authenticate, getMessagesInChat)

messageRouter.get("/all",  authenticate, isAdmin, getAllMessages)

messageRouter.delete("/delete/all", authenticate, isAdmin, deleteAllMessages)

export default messageRouter