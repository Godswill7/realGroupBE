import cors from "cors"
import express, { Application, Request, Response } from "express"
import student from "./router/userRouter"
import bag from "./router/userRouter"
import fee from "./router/FeeRouter"
import { HTTP } from "./error/mainError"

export const mainApp =(app:Application) => {
    app.use(express.json())
    app.use(cors()) 
    app.use("/api",student)
    app.use("/api",bag)
    app.use("/api",fee)
    

app.get("/",(req:Request,res:Response)=>{
try {
    return res.status(HTTP.OK).json({
        message: "Welcome",
})
} catch (error) {
    return res.status(HTTP.BAD).json({
      message: "Root Error",
    });
}
})
}

