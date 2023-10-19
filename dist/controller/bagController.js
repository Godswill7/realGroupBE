"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBag = exports.viewBagRecord = exports.createBagRecord = void 0;
const StudentModel_1 = __importDefault(require("../model/StudentModel"));
const BagModel_1 = __importDefault(require("../model/BagModel"));
const mongoose_1 = __importDefault(require("mongoose"));
const mainError_1 = require("../error/mainError");
const createBagRecord = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bag, email } = req.body;
        const searchUser = yield StudentModel_1.default.findOne({ email });
        if (searchUser) {
            const bagInfo = yield BagModel_1.default.create({
                bag,
                cash: bag * 200,
            });
            const update = yield StudentModel_1.default.findByIdAndUpdate(searchUser._id, {
                balance: (searchUser === null || searchUser === void 0 ? void 0 : searchUser.balance) + (bagInfo === null || bagInfo === void 0 ? void 0 : bagInfo.cash),
            }, { new: true });
            console.log(update);
            searchUser.bagHistory.push(new mongoose_1.default.Types.ObjectId(bagInfo === null || bagInfo === void 0 ? void 0 : bagInfo._id));
            searchUser.save();
            return res.status(201).json({
                message: "Bag created",
                data: bagInfo,
            });
        }
        else {
            return res.status(404).json({
                message: "user does not exist",
            });
        }
    }
    catch (error) {
        return res.status(404).json({
            message: "Error",
            data: error.message
        });
    }
});
exports.createBagRecord = createBagRecord;
const viewBagRecord = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { studentID } = req.params;
        const searchUser = yield StudentModel_1.default.findById(studentID).populate({
            path: "bagHistory",
            options: {
                sort: {
                    createdAt: -1,
                },
            },
        });
        return res.status(mainError_1.HTTP.OK).json({
            message: "viewing user bag history",
            data: searchUser,
        });
    }
    catch (error) {
        return res.status(mainError_1.HTTP.BAD).json({
            message: "Error viewing user bag history",
            data: error.message,
        });
    }
});
exports.viewBagRecord = viewBagRecord;
const deleteBag = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { studentID } = req.params;
        yield BagModel_1.default.findByIdAndDelete(studentID);
        return res.status(mainError_1.HTTP.DELETE).json({
            message: "Bag History Deleted",
        });
    }
    catch (error) {
        return res.status(mainError_1.HTTP.BAD).json({
            message: "Error deleting bag history",
            data: error.message,
        });
    }
});
exports.deleteBag = deleteBag;
