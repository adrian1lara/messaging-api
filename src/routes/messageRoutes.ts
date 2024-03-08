import { Router } from "express";
import { sendMessage, getMessagesInChat } from "../controllers/messageController";
import { authenticate } from "../middlewares/auth";

const messageRouter = Router()

messageRouter.post("/:chatId/new", authenticate, sendMessage)

messageRouter.get("/:chatId/messages", authenticate, getMessagesInChat)

export default messageRouter