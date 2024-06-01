import express, {Request, Response} from "express";
import {getUser} from "../service/user.service";
const router = express.Router();
router.use(express.json());
router.get("/", (req: Request, res: Response) => {
   getUser(req,res).catch((e)=>console.log(e))
});

export default router;
