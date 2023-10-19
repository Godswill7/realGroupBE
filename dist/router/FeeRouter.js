"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const FeeStudent_1 = require("../controller/FeeStudent");
const Router = express_1.default.Router();
Router.route("/create-fee").post(FeeStudent_1.createFeeRecord),
    Router.route("/:studentID/viewFee").get(FeeStudent_1.viewFeeRecord);
exports.default = Router;
