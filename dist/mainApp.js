"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainApp = void 0;
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const userRouter_1 = __importDefault(require("./router/userRouter"));
const bagRouter_1 = __importDefault(require("./router/bagRouter"));
const FeeRouter_1 = __importDefault(require("./router/FeeRouter"));
const mainError_1 = require("./error/mainError");
const mainApp = (app) => {
    app.use(express_1.default.json());
    app.use((0, cors_1.default)());
    app.use("/api", userRouter_1.default);
    app.use("/api", bagRouter_1.default);
    app.use("/api", FeeRouter_1.default);
    app.get("/", (req, res) => {
        try {
            return res.status(mainError_1.HTTP.OK).json({
                message: "Welcome",
            });
        }
        catch (error) {
            return res.status(mainError_1.HTTP.BAD).json({
                message: "Root Error",
            });
        }
    });
};
exports.mainApp = mainApp;
