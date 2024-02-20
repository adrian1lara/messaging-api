import { Router } from "express";
import { createChat, getChats, getUserChats } from "../controllers/chatController";

const chatRouter = Router()

chatRouter.post("/new", createChat)

chatRouter.get("/all", getChats)

chatRouter.get("/all/:userId", getUserChats)

export default chatRouter