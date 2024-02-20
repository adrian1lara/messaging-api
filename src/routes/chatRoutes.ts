import { Router } from "express";
import { createChat, getChats } from "../controllers/chatController";

const chatRouter = Router()

chatRouter.post("/new", createChat)

chatRouter.get("/all", getChats)

export default chatRouter