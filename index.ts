import express, { Application } from "express"
import { mainApp } from "./mainApp";


const port: number = 1111;
const app: Application = express()

const server = app.listen(() => {
    console.log()
    console.log("Server is up 🚀🚀🚀")
})
mainApp(app)

process.on("uncaughtException",(error:Error | any) => {
console.log("Error due to uncaughtException", error);
})

process.on("unhandledRejection", (reason: Error | any) => {
    server.close(() => {
        console.log("Error due to unhandledRejection",reason);
    })
});