import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import dotenv from "dotenv";
import {NextFunction, Request, Response} from "express";
import {getToken} from "../utils/authUtils";
dotenv.config();
const privateKey: string | undefined = process.env.JWT_SECRET
export const comparePasswords = (password: string, hash: string) => {
    return bcrypt.compare(password, hash)
}

export const hashPassword = (password: string) => {
    return bcrypt.hash(password, 5)
}

export const createJWT = (user:any) => {

    if(!privateKey){
        return;
    }
    const token = jwt.sign({
            id: user.id,
            username: user.email
        },
        privateKey
    )
    return token
}

export const protect = (req: any, res: Response, next: any) => {
   const token = getToken(req, res);
    if(!privateKey){
        res.status(401)
        res.json({message: 'not authorized'})
        return
    }
    if (!token) {
        res.status(401)
        res.json({message: 'not valid token'})
        return
    }
    try {
        const user = jwt.verify(token, privateKey)
        req.user = user
        next()
    } catch (e) {
        console.error(e)
        res.status(401)
        res.json({message: 'not valid token'})
        return
    }
}