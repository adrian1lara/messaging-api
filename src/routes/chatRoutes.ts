import { Router } from "express";
import { createChat } from "../controllers/chatController";

const chatRouter = Router()

chatRouter.post("/newChat", createChat)

export default chatRouter