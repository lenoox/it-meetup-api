import {Request, Response} from "express";

import prisma from "../../prisma/index";

export const createUser = async (req: Request, res: Response) => {
    const {name, email, phone, password} = req.body
    try {
        if(!name || !email || ! phone || !password) {
            throw new Error('Fields name, email, phone and password must be provided.')
        }
        const vendor = await prisma.user.create({data: {name, email, phone, password}})
        res.status(200).json(vendor);
    } catch (error: any) {
       res.status(401).json({success: false, error: error.message})
    }
}
export const getUser = async (req: Request, res: Response) => {
    try {
        const events = await prisma.user.findMany()
        res.status(200).json(events);
    } catch (error: any) {
        res.status(401).json({success: false, error: error.message})
    }
}