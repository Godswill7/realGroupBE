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
exports.checkOutWithPayStack = exports.deleteAllUser = exports.deleteUser = exports.updateUserInfo = exports.getAllUser = exports.getUser = exports.VerifyStudent = exports.signInUser = exports.createUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const StudentModel_1 = __importDefault(require("../model/StudentModel"));
const mainError_1 = require("../error/mainError");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const crypto_1 = __importDefault(require("crypto"));
const email_1 = require("../utils/email");
const https_1 = __importDefault(require("https"));
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, studentName } = req.body;
        const encrypt = yield bcrypt_1.default.genSalt(10);
        const hash = yield bcrypt_1.default.hash(password, encrypt);
        const tokenValue = crypto_1.default.randomBytes(10).toString("hex");
        const token = jsonwebtoken_1.default.sign(tokenValue, "justRand");
        const user = yield StudentModel_1.default.create({
            email,
            password: hash,
            studentName,
            token,
            studentImage: yield email.charAt().toUpperCase(),
        });
        (0, email_1.sendMail)(user).then(() => {
            console.log("Mail Sent...");
        });
        return res.status(mainError_1.HTTP.CREATE).json({
            message: "user created successfully",
            data: user,
        });
    }
    catch (error) {
        return res.status(mainError_1.HTTP.BAD).json({
            message: "Error creating user",
            data: error.message,
        });
    }
});
exports.createUser = createUser;
const signInUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const student = yield StudentModel_1.default.findOne({ email });
        if (student) {
            const checkPass = yield bcrypt_1.default.compare(password, student === null || student === void 0 ? void 0 : student.password);
            if (checkPass) {
                if ((student === null || student === void 0 ? void 0 : student.verify) && (student === null || student === void 0 ? void 0 : student.token) === "") {
                    console.log(student === null || student === void 0 ? void 0 : student.verify);
                    console.log(student === null || student === void 0 ? void 0 : student.token);
                    const token = jsonwebtoken_1.default.sign({ id: student._id }, "code");
                    return res.status(mainError_1.HTTP.OK).json({
                        message: `Welcome back ${student.studentName}`,
                        data: token,
                    });
                }
                else {
                    return res.status(mainError_1.HTTP.BAD).json({
                        message: "go and verify your email",
                    });
                }
            }
            else {
                return res.status(mainError_1.HTTP.BAD).json({
                    message: "Incorrect password",
                });
            }
        }
        else {
            return res.status(mainError_1.HTTP.BAD).json({
                message: "User does not exist",
            });
        }
    }
    catch (error) {
        return res.status(mainError_1.HTTP.BAD).json({
            message: "Error signing in user",
            data: error.message,
        });
    }
});
exports.signInUser = signInUser;
const VerifyStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { token } = req.params;
        const getStudentId = jsonwebtoken_1.default.verify(token, "code", (err, payload) => {
            if (err) {
                return err;
            }
            else {
                return payload;
            }
        });
        console.log(getStudentId);
        const student = yield StudentModel_1.default.findByIdAndUpdate(getStudentId === null || getStudentId === void 0 ? void 0 : getStudentId.id, { token: "", verify: true }, { new: true });
        return res.status(mainError_1.HTTP.OK).json({
            message: "verified successfully",
            data: student === null || student === void 0 ? void 0 : student.id,
        });
    }
    catch (error) {
        return res.status(mainError_1.HTTP.BAD).json({
            message: "error",
            data: error.message,
        });
    }
});
exports.VerifyStudent = VerifyStudent;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { studentID } = req.params;
        const user = yield StudentModel_1.default.findById(studentID);
        return res.status(mainError_1.HTTP.OK).json({
            message: "user found successfully",
            data: user,
        });
    }
    catch (error) {
        return res.status(mainError_1.HTTP.BAD).json({
            message: "Error finding user",
            data: error.message,
        });
    }
});
exports.getUser = getUser;
const getAllUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield StudentModel_1.default.find();
        return res.status(mainError_1.HTTP.OK).json({
            message: "All user found successfully",
            data: user,
        });
    }
    catch (error) {
        return res.status(mainError_1.HTTP.BAD).json({
            message: "Error finding all user",
            data: error.message,
        });
    }
});
exports.getAllUser = getAllUser;
const updateUserInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { studentID } = req.params;
        const user = yield StudentModel_1.default.findById(studentID);
        if (user) {
            const { schoolName, phoneNumber, HouseAddress, gender } = req.body;
            const update = yield StudentModel_1.default.findByIdAndUpdate(studentID).updateOne({
                schoolName,
                phoneNumber,
                HouseAddress,
                gender,
            }, {
                new: true,
            });
            yield user.save();
            return res.status(mainError_1.HTTP.UPDATE).json({
                message: "updated successfully",
                data: update,
            });
        }
        else {
            return res.status(mainError_1.HTTP.BAD).json({
                message: "User does not exist",
            });
        }
    }
    catch (error) {
        return res.status(mainError_1.HTTP.BAD).json({
            message: "Error updating user",
            data: error.message,
        });
    }
});
exports.updateUserInfo = updateUserInfo;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { studentID } = req.params;
        yield StudentModel_1.default.findByIdAndDelete(studentID);
        return res.status(mainError_1.HTTP.DELETE).json({
            message: "user deleted successfully",
        });
    }
    catch (error) {
        return res.status(mainError_1.HTTP.DELETE).json({
            message: "error deleting user",
            data: error.message,
        });
    }
});
exports.deleteUser = deleteUser;
const deleteAllUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield StudentModel_1.default.deleteMany();
        return res.status(mainError_1.HTTP.DELETE).json({
            message: "All user deleted successfully",
        });
    }
    catch (error) {
        return res.status(mainError_1.HTTP.DELETE).json({
            message: "error deleting all user",
            data: error.message,
        });
    }
});
exports.deleteAllUser = deleteAllUser;
const checkOutWithPayStack = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, amount } = req.body;
        const { studentID } = req.params;
        const params = JSON.stringify({
            email,
            amount: parseInt(amount) * 100,
            studentID,
        });
        const options = {
            hostname: "api.paystack.co",
            port: 443,
            path: "/transaction/initialize",
            method: "POST",
            headers: {
                Authorization: "Bearer sk_test_69da8b749744f32de8dd9359178903450d74b650",
                "Content-Type": "application/json",
            },
        };
        const ask = https_1.default
            .request(options, (resp) => {
            let data = "";
            resp.on("data", (chunk) => {
                data += chunk;
            });
            resp.on("end", () => {
                console.log(JSON.parse(data));
                res.status(mainError_1.HTTP.OK).json({
                    message: "Payment successful",
                    data: JSON.parse(data),
                });
            });
        })
            .on("error", (error) => {
            console.error(error.message);
        });
        ask.write(params);
        ask.end();
    }
    catch (error) {
        return res.status(mainError_1.HTTP.BAD).json({
            message: "Error making Payment",
            data: error.message,
        });
    }
});
exports.checkOutWithPayStack = checkOutWithPayStack;
