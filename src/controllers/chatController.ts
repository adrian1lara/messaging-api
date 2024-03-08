import User from "../models/user"
import Chat from "../models/chat"
import { Response , Request} from "express"


export const deleteAllChats = async(req: Request, res: Response) => {
    try {
        
        await Chat.deleteMany()

        res.status(201).send("Successfully deleted")

    } catch (error) {
        console.error(error)
        return res.status(500).send("Somenthing went wrong")
    }
}

export const createChat = async (req: Request, res: Response) => {

    try {
        
        const { participants } = req.body

        // Check for existing chat with same participants
        const existingChat = await Chat.findOne({ participants });
        if (existingChat) {
        return res.status(401).json({ message: "Chat already exists", chat: existingChat });
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

export const getChatByUserId = async (req: Request, res:Response) => {

    const userId = req.query.userId

    try {

        const existingChat = await Chat.findOne({ participants: { $all : [req.user?._id, userId] }})

        if(existingChat) {
            return res.status(201).json([existingChat])
        } else {
            res.json([])
        }
        
    } catch (error) {
        console.error(error)
        return res.status(500).send("Somenthing went wrong")
    }
}