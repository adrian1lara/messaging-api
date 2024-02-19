import { Request, Response } from "express"
import User  from "../models/user"
import { hashSync } from "bcrypt"

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