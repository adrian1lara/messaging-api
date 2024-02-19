import User_Chat from "../models/user_chat";
import User from "../models/user";
import Chat from "../models/chat";
import { Request, Response } from "express";


export const createUser_Chat = async(req: Request, res: Response) => {
    try {
        const { userId, chatId } = req.body

        const user = User.findById(userId)
        const chat = Chat.findById(chatId)

        if(!user || !chat ) {
            return res.status(404).send("User or chat not found")
        }

        const existingUserChat = await User_Chat.findOne({user: userId, chat: chatId})

        if(existingUserChat) {
            res.status(400).send("User is already part of the chat")
        }

        const user_chat = new User_Chat({ user: userId, chat: chatId})

        await user_chat.save()

        return res.status(201).send(user_chat)

    } catch (error) {
        console.error(error)
        return res.status(500).send("Something went wrong :(")
    }
}


export const getUser_Chat = async(req: Request, res: Response) => {
    try {

        const user_chats = await User_Chat.find()

        if(!user_chats || user_chats.length == 0) {
            return res.status(404).send("User chat relation not found")
        }

        
        return res.status(201).send(user_chats)

    } catch (error) {
        console.error(error)
        return res.status(500).send("something went wrong :/")
    }
} 
