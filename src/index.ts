import express, { Express, Request, Response } from "express";
import event from "./controllers/event.controller";
import user from "./controllers/user.controller";
import auth from "./controllers/auth.controller";
import morgan from "morgan";
import cors from "cors";

import dotenv from "dotenv";
import {protect} from "./core/auth";


const app = express();
dotenv.config();
const port = process.env.PORT;

let whitelist = ['http://localhost:80', 'http://localhost:5173']
let corsOptions = {
    origin:  (origin:any, callback:any)=> {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}
//app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" :response-time ms\n'))
app.use(morgan(' - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" :response-time ms\n'))
app.use(cors(corsOptions))
app.use('/auth', auth);
app.use('/user', user);
app.use('/event', protect, event);

app.listen(port, () => console.log('Application is running'));