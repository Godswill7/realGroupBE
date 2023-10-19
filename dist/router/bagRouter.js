"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bagController_1 = require("../controller/bagController");
const Router = express_1.default.Router();
Router.route("/create-bag-record").patch(bagController_1.createBagRecord);
Router.route("/:studentID/view-student-bag").get(bagController_1.viewBagRecord);
Router.route("/:bagID/delete-bag").delete(bagController_1.deleteBag);
exports.default = Router;
