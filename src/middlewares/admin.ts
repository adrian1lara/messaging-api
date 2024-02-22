import { NextFunction, Request, Response } from "express";


export default function isAdmin(req: Request, res: Response, next: NextFunction) {

    if(req.user?.role != 'admin') {
        return res.status(403).send("Not authorized")
    }

    next()
}