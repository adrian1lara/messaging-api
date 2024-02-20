import { Router } from "express";
import { createMessage, getMessagesInChat } from "../controllers/messageController";

const messageRouter = Router()

messageRouter.post("/:userId/:chatId/new", createMessage)

messageRouter.get("/:userId/:chatId/messages", getMessagesInChat)

export default messageRouter