import express, {Request, Response} from "express";
import {createUser, signin} from "../service/auth.service";
const router = express.Router();
router.use(express.json());
router.post("/signin", (req: Request, res: Response) => {
    signin(req,res).catch((e)=>console.log(e))
});
router.post("/register", (req: Request, res: Response) => {
    createUser(req,res).catch((e)=>console.log(e))
});

export default router;