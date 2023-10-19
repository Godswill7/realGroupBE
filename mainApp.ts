import cors from "cors"
import express, { Application, Request, Response } from "express"
import student from "./router/userRouter"
import { HTTP } from "./error/mainError"

export const mainApp =(app:Application)=>{
    app.use(express.json())
    app.use(cors()) 
    app.use("/api",student)
    app.use(cors())
    

app.get("/",(req:Request,res:Response)=>{
try {
    return res.status(HTTP.OK).json({
        message: "Welcome",
})
} catch (error) {
    console.log("error")
}
})
}

