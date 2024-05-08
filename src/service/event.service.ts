import prisma from '../../prisma/index'
import {Request, Response} from "express";

export const createEvent = async (req: Request, res: Response) => {
    try {
        const {userId,title, organisation, description, dateTime} = req.body
        const date = new Date(dateTime);
        if(!title || !organisation || !description || !date || !userId) {
            throw new Error('Fields title, organisation, description, date and user must be provided.')
        }
        const vendor = await prisma.event.create(
            {
                data: {
                    title,
                    organisation,
                    description,
                    date,
                    user: {
                        connect: { id: userId }
                    }
            }
        })
        res.status(200).json(vendor);
    } catch (error: any) {
        res.status(401).json({success: false, error: error.message})
    }
}
export const getEvent = async (req: Request, res: Response) => {
    try {
        const events = await prisma.event.findMany()
        res.status(200).json(events);
    } catch (error: any) {
        res.status(401).json({success: false, error: error.message})
    }
}