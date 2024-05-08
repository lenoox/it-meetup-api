import express, {Request, Response} from "express";
import { createUser, getUser} from "../service/user.service";
const router = express.Router();
router.use(express.json());
router.post("/", (req: Request, res: Response) => {
   createUser(req,res).catch((e)=>console.log(e))
});
router.get("/", (req: Request, res: Response) => {
   getUser(req,res).catch((e)=>console.log(e))
});

export default router;
