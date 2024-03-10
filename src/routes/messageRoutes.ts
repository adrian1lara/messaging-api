import { Router } from "express";
import { sendMessage, getMessagesInChat, getAllMessages, deleteAllMessages } from "../controllers/messageController";
import { authenticate } from "../middlewares/auth";

const messageRouter = Router()

messageRouter.post("/:chatId/new", authenticate, sendMessage)

messageRouter.get("/:chatId/messages", authenticate, getMessagesInChat)

messageRouter.get("/all", getAllMessages)

messageRouter.delete("/delete/all", deleteAllMessages)

export default messageRouter