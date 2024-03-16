import { NextFunction, Request, Response } from "express";
import User from "../models/user";

export default async function limitUsers (req: Request, res: Response, next: NextFunction) {

    try {

        const countUsers = await User.countDocuments()

        if(countUsers >= 100) {
            return res.status(403).json("We reached the max limit of users")
        }


        next()

    } catch (error) {
        console.error(error)
        return res.status(500).json("somenting went wrong :/")
    }
}