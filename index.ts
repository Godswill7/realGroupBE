import express,{Application} from "express"
import dotenv from "dotenv"
dotenv.config()
const port = process.env.APPLICATION_PORT
const app:Application = express()

const server = app.listen(port,()=>{
console.log("")
console.log("Server is on")
})

process.on("uncaughtException",(error:any)=>{
console.log("server is crashing due to uncaughtException",error)
process.exit(1)
})

process.on("unhandledRejection",(reason:any)=>{
console.log("server is crashing due to unhandledRejection",reason)
server.close(()=>{
    process.exit(1)
})

})