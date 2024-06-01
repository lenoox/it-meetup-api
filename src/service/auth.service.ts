import {Request, Response} from "express";

import prisma from "../db";
import {comparePasswords, createJWT, hashPassword} from "../core/auth";
import {userToDto} from "../mappers/userMappers";
import {User} from "@prisma/client";


export const createUser = async (req: Request, res: Response) => {
    const {name, email, phone, password} = req.body
    try {
        if(!name || !email || ! phone || !password) {
            throw new Error('Fields name, email, phone and password must be provided.')
        }
        const user = await prisma.user.create(
            {
                data: {
                    name,
                    email,
                    phone,
                    password: await hashPassword(password)
                }
            })

        res.status(200).json(userToDto(user))
    } catch (error: any) {
       res.status(401).json({success: false, error: error.message})
    }
}
export const signin = async (req: Request, res: Response) => {
    try {
        const user= await prisma.user.findUnique({
            where: {
                email: req.body.email
            }
        })
        if(!user){
            res.json({message: 'Error'})
            return
        }
        const isValid = await comparePasswords(req.body.password, user.password)
        if (!isValid) {
            res.status(401)
            res.json({message: 'Error'})
            return
        }

        const token = createJWT(user)
        const userUpdate = await prisma.user.update({
            where: {
                id: user.id
            },
            data: {
                token: token
            }
        });
        res.status(200).json({ token })
    } catch (error: any) {
        res.status(401).json({success: false, error: error.message})
    }
}