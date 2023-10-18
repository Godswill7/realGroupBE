"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const bagModel = new mongoose_1.default.Schema({
    bag: {
        type: Number,
    },
    cash: {
        type: Number,
    },
    student: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "bags",
    },
}, { timestamps: true });
exports.default = mongoose_1.default.model("bags", bagModel);
