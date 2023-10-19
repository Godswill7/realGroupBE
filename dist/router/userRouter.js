"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controller/userController");
const router = express_1.default.Router();
router.route("/create").post(userController_1.createUser);
router.route("/sign-in").post(userController_1.signInUser);
router.route("/:studentID/get-one").get(userController_1.getUser);
router.route("/:token/verify").post(userController_1.VerifyStudent);
router.route("/get-all").get(userController_1.getAllUser);
router.route("/:studentID/update-one").patch(userController_1.updateUserInfo);
router.route("/:studentID/delete-one").delete(userController_1.deleteUser);
router.route("/delete-all").delete(userController_1.deleteAllUser);
router.route("/:studentID/paystack").post(userController_1.checkOutWithPayStack);
exports.default = router;
