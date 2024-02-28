import { Router } from "express";
import { createMessage, getMessagesInChat } from "../controllers/messageController";
import { authenticate } from "../middlewares/auth";

const messageRouter = Router()

messageRouter.post("/:userId/:chatId/new", authenticate, createMessage)

messageRouter.get("/:userId/:chatId/messages", authenticate, getMessagesInChat)

export default messageRouter