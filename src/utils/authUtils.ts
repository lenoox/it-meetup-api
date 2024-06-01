import {Response} from "express";

export const getToken = (req: any, res: Response):string|undefined=>{
    const bearer = req.headers.authorization
    if (!bearer) {
        res.status(401)
        res.json({message: 'not authorized'})
        return
    }

    const [, token] = bearer.split(' ')
    return token;
}