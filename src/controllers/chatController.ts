import User from "../models/user"
import Chat from "../models/chat"
import { Response , Request} from "express"

export const createChat = async (req: Request, res: Response) => {

    try {
        
        const { participants } = req.body

        const existingUsers = await User.find({ _id: { $in : participants }})
    
        if(existingUsers.length !== existingUsers.length) {
            return res.status(400).send("Invalid users ID's provided")
        }
    
        const newChat = new Chat({ participants: participants })
    
        await newChat.save()
    
        res.status(201).send(newChat)

    } catch (error) {
        console.error(error)
        return res.status(500).send("Something went wrong")
    }
   
}

export const getChats = async(req: Request, res: Response) => {
    try {
        
        const chats = await Chat.find()

        if(!chats) {
            return res.status(404).send("Chats not found")
        }

        return res.status(201).send(chats)

    } catch (error) {
        console.error(error)
        return res.status(500).send("Something went wrong :(")
        
    }
}


export const getUserChats = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params

        if(req.user?._id != userId) {
            return res.status(403).send("Not authorized, not user account")
        }

        const user = await User.findById(userId)

        if(!user) {
            return res.status(404).send("User not found")
        }



        const userChats = await Chat.find({ participants: userId })

        if(!userChats) {
            return res.status(404).send("Chats not found")
        }

        return res.status(201).send(userChats)
        
    } catch (error) {
        console.error(error)
        return res.status(404).send("Somenthing went wrong :/")
    }
}