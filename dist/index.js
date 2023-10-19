"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Database_1 = require("./config/Database");
const express_1 = __importDefault(require("express"));
const mainApp_1 = require("./mainApp");
const port = 1111;
const app = (0, express_1.default)();
const server = app.listen(port, () => {
    console.log();
    (0, Database_1.dbConnect)();
    console.log("Server is up 🚀🚀🚀");
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
