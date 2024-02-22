import dotenv from 'dotenv'

dotenv.config()
import { NextFunction, Request, Response } from 'express'
import jwt from  'jsonwebtoken'
import User from '../models/user'


export const authenticate = async(req: Request, res: Response, next: NextFunction) => {
    try {
        let token  = req.headers.authorization?.split(' ')[1] || ''

        if(!token) {
            return res.status(401).send("Not authorized, token not found")
        }

        const jwtSecret = process.env.JWT_SECRET || ""
        const decoded = jwt.verify(token, jwtSecret) as jwt.JwtPayload

        if(!decoded || !decoded._id){
            return res.status(401).send("Not authorized, user ID not found")
        }

        const user = await User.findById(decoded._id, "_id username email")

        if(!user) {
            return res.status(404).send("Not authorized, user not found")
        }

        req.user = user

        next()

    } catch (error) {
        return res.status(401).send("Not authorized, invalid token")
    }
}
