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
exports.openingMail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const googleapis_1 = require("googleapis");
const path_1 = __importDefault(require("path"));
const ejs_1 = __importDefault(require("ejs"));
const GOOGLE_ID = "350112565242-4qn4bpqq2k9cts6mqs7ig1r55c38q83r.apps.googleusercontent.com";
const GOOGLE_SECRET = "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";
const GOOGLE_REFRESHTOKEN = "1//04qqJUlI9iAtWCgYIARAAGAQSNwF-L9IrmX1rqA0KFMphKTzV60NxqDifoc7kkPiZ7QTWmkbKN10Fb9fXFvCcvvnd3q-Ro2uHx_4";
const GOOGLE_URL = "https://developer.google.com/oauthplayground";
const oAuth = new googleapis_1.google.auth.OAuth2(GOOGLE_ID, GOOGLE_SECRET, GOOGLE_URL);
oAuth.setCredentials({ access_token: GOOGLE_REFRESHTOKEN });
const URL = "http://localhost:3344";
const openingMail = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const accessToken = (yield oAuth.getAccessToken()).token;
        const transport = nodemailer_1.default.createTransport({
            service: "gmail",
            auth: {
                type: "OAuth2",
                user: "udidagodswill7@gmail.com",
                clientId: GOOGLE_ID,
                clientSecret: GOOGLE_SECRET,
                refreshToken: GOOGLE_REFRESHTOKEN,
                accessToken,
            },
        });
        const data = {
            email: user.email,
            userName: user.name,
            // url: `${URL}/api/${user.id}/verified`,
        };
        const locateFile = path_1.default.join(__dirname, "../views/request.ejs");
        const readFile = yield ejs_1.default.renderFile(locateFile, data);
        const mailer = {
            from: "Account Opening 🚀🚀🚀 <udidagodswill7@gmail.com>",
            to: user === null || user === void 0 ? void 0 : user.email,
            subject: "Account Opening",
            html: readFile,
        };
        transport.sendMail(mailer);
    }
    catch (error) {
        console.log(error.message);
    }
});
exports.openingMail = openingMail;
