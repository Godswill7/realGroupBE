import cors from "cors"
import express,{Application,Request,Response} from "express"
import student from "./router/userRouter"
export const mainApp = ((app:Application)=>{
app.use(cors())
app.use(express.json())
app.use("api",student)

app.get("/",(req:Request,res:Response)=>{
    try {
        return res.status(404).json({
         message:"welcome to our platform"})
    } catch (error) {
        return res.status(404).json({
          message:"error"
        })
    }
})
})

