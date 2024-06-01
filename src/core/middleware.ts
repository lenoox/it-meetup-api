import { validationResult } from "express-validator";
import { Request, Response} from "express";
export const handleInputErrors = (req:Request, res:Response, next:any) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        res.status(400);
        res.json({ errors: errors.array() });
    } else {
        next()
    }
}