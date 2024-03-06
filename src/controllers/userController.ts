import { Request, Response } from "express"
import User  from "../models/user"
import { compareSync, hashSync } from "bcrypt"
import { sign } from "jsonwebtoken"


export const findUserByUsername = async(req: Request, res: Response ) => {

    const searchTerm = req.query.searchTerm as String
    
    try {
        
        const query = searchTerm ? { username: { $regex: searchTerm, $options: "i"}} : {} // i for case-insensitive search

        const users = await User.find(query)

        if(users.length <= 0) {
            return res.status(404).json("Username not found")
        }

        return res.status(201).json(users)

    } catch (error) {
        console.error(error)
        res.status(500).send("Somenthing went wrong :/")
    }



}


export const loginUser = async(req: Request, res: Response) => {
    
    try {
        
        const user = req.body

        const { email, password } = user

        const isUserExist = await User.findOne({ email: email })

        if(!isUserExist) {
            return res.status(404).send("User not found")
        }

        const isPassword = compareSync(password, isUserExist?.password.toString())

        if(!isPassword) {
            return res.status(400).send("Wrong password")
        }

        const token = sign(
            { _id: isUserExist?._id, email: isUserExist?.email, username: isUserExist?.username, role: isUserExist?.role},
            process.env.JWT_SECRET || "",
            {
                expiresIn: '1d'
            }
        )

        return res.status(201).send(token)

    } catch (error) {
        console.error(error)
        return res.status(500).send("Somenthing went wrong :/")
    }

}

export const createUser = async (req: Request, res: Response) => {
    try {
        const { email, username, password } = req.body
        if(!email || !username || !password) return res.status(400).send("All fields are required")

        const hashedpass = hashSync(req.body.password, 10)

        const user = new User ({email, username, password: hashedpass})

        await user.save()

        res.status(201).send(user)


    } catch (error) {
        console.error(error)
        res.status(500).send("Something went wrong")
    }


}



export const getUsers = async (req: Request, res: Response) => {
    try {
        
        const users = await User.find().exec()

        if(!users) {
            return res.status(404).send("User not found")
        }

        res.status(201).send(users)

    } catch (error) {
        console.error(error)
        res.status(500).send("Something went wrong")
    }
}


export const getUserByToken = async(req: Request, res: Response) => {
    
    const userId = req.user?._id

    const user = await User.findById(userId, 'username email role')
    
    if(!user) {
        return res.status(400)
    }

    return res.status(201).json(user)
}

export const deleteUserByAdmin = async (req: Request, res:Response) => {
    try {
        const { userId } = req.params

        const user = await User.findById(userId)
    
        if(!user) {
            return res.status(404).send("User not found")
        }
    
        await User.findByIdAndDelete(userId)
    
        return res.status(201).send("Deleted successfully")

    } catch (error) {
        console.error(error)
        return res.status(500).send("Somenthing went wrong :/")
    }

}


export const deleteUserAccount = async(req: Request, res: Response) => {
    try {
        
        const {userId} = req.params

        if(req.user?._id != userId) {
            return res.status(403).send("Not authorized, not the owner")
        }

        const user = await User.findById(userId) 

        if(!user) {
            return res.status(404).send("User not found")
        }

        await User.findByIdAndDelete(userId)

        return res.status(201).send("Succesfully deleted")

    } catch (error) {
        console.error(error)
        return res.status(500).send("Somenthing went wrong :/")
        
    }

}