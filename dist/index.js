"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Database_1 = require("./config/Database");
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mainApp_1 = require("./mainApp");
dotenv_1.default.config();
const port = parseInt(process.env.PORT);
const app = (0, express_1.default)();
const server = app.listen(port, () => {
    console.log();
    (0, Database_1.dbConnect)();
});
(0, mainApp_1.mainApp)(app);
process.on("uncaughtException", (error) => {
    console.log("Error due to uncaughtException", error);
});
process.on("unhandledRejection", (reason) => {
    server.close(() => {
        console.log("Error due to unhandledRejection", reason);
    });
});
