import { Request, Response } from "express"
import User  from "../models/user"

export const createUser = async (req: Request, res: Response) => {
    try {
        const { email, username, password } = req.body
        if(!email || !username || !password) return res.status(400).send("All fields are required")

        const user = new User({ email, username, password })
        await user.save()
        res.send(user)

    } catch (error) {
        console.error(error)
        res.status(500).send("Something went wrong")
    }


}


