import { Router } from "express";
import { createChat, getChats } from "../controllers/chatController";

const chatRouter = Router()

chatRouter.post("/newChat", createChat)

chatRouter.get("/chats", getChats)

export default chatRouter