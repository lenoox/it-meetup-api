import express, {Request, Response} from "express";
import {createEvent, getEvent} from "../service/event.service";

const router = express.Router();
router.use(express.json());

router.post("/", (req: Request, res: Response) => {
    console.log(1)
    createEvent(req, res).catch((e)=>console.log(e))
});
router.get("/",(req: Request, res: Response) => {
    getEvent(req, res).catch((e)=>console.log(e))
});
export default router;
