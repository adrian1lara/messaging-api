import { Router } from "express";
import { createMessage } from "../controllers/messageController";

const messageRouter = Router()

messageRouter.post("/:userId/:chatId/new", createMessage)

export default messageRouter