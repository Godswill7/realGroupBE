import cors from "cors"
import express, {Application } from "express"
import student from "./router/userRouter"

export const mainApp =(app:Application)=>{
    app.use(express.json())
    app.use(cors())
    app.use("/api",student)

app.get("/",()=>{
try {
    console.log("welcome to our platform")
} catch (error) {
    console.log("error")
}
})
}

