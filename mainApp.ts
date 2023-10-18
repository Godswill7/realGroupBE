import cors from "cors"
import express, {Application } from "express"

export const mainApp =(app:Application)=>{
    app.use(express.json())
    app.use(cors())
    

app.get("/",()=>{
try {
    console.log("welcome to our platform")
} catch (error) {
    console.log("error")
}
})
}

