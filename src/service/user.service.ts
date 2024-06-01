import {Request, Response} from "express";

import prisma from "../db";
import {getToken} from "../utils/authUtils";
import {userToDto} from "../mappers/userMappers";

export const getUser = async (req: Request, res: Response) => {
    const token:string|undefined = getToken(req,res);
    if (!token) {
        res.status(401)
        res.json({message: 'not valid token'})
        return
    }
    try {
        const user = await prisma.user.findMany({
            where: {
                token
            }
        })
        res.status(200).json(userToDto(user[0]))
    } catch (error: any) {
        res.status(401).json({success: false, error: error.message})
    }
}