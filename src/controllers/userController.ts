import { Request, Response } from "express"
import User  from "../models/user"
import { compareSync, hashSync } from "bcrypt"
import { sign } from "jsonwebtoken"


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
            { _id: isUserExist?._id, email: isUserExist?.email, username: isUserExist?.username},
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


export const getUser = async(req: Request, res: Response) => {
    const userId = req.user?._id

    const user = await User.findById(userId, 'username email')
    
    if(!user) {
        return res.status(400)
    }

    return res.status(201).json(user)
}