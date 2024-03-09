import { Request, Response } from "express";
import Message from "../models/message";
import User from "../models/user";
import Chat from "../models/chat";

export const getAllMessages = async(req: Request, res: Response) => {
    try {
        
        const messages = await Message.find()

        return res.status(201).json(messages)

    } catch (error) {
        console.error(error)
        return res.status(500).send("Somenthing went wrong :/")
    }
}

export const getMessagesInChat = async(req: Request, res: Response) => {
    try {
        const { chatId } = req.params

        const userId = req.user?._id

        const user = await User.findById(userId)
    
        if(!user) {
            return res.status(404).send("user not found")
        }
    
        const messages = await Message.find({chat: chatId})
    
        if(!messages) { 
            return res.status(404).send("Messages not found")
        }
    
        return res.status(201).json(messages)
    } catch (error) {
        console.error(error)
        return res.status(500).send("somenthing went wrong :/")
    }
}

export const sendMessage = async(req: Request, res: Response) => {
    try {
        
        const { chatId } = req.params
        const { text } = req.body

        const userId = req.user?._id

        const user = await User.findById(userId)

        if(!user) {
            return res.status(404).send("user not found")
        }

        const userInChat = await Chat.findOne({ _id: chatId, participants: userId})

        if(!userInChat) {
            return res.status(400).send("user is not part of the chat")
        }

        

        const newMessage = new Message({
            content: text,
            sender: userId,
            chat: chatId
        })

        await newMessage.save()

        return res.status(201).json(newMessage)


    } catch (error) {
        console.error(error)
        return res.status(500).send("Somenthing went wrong :/")
    }
}