const router = require("express").Router();
import {Request,Response} from "express"
router.get("/", (req:Request, res:Response) => {
    res.send("console")
})
export default router