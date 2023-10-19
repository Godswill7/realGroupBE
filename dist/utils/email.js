"use strict";
// import nodemailer from "nodemailer";
// import { google } from "googleapis";
// import path from "path";
// import ejs from "ejs";
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
exports.sendMail = void 0;
// const GOOGLE_ID =
//   "350112565242-i5a82npf6pc73u523721ee54igrgc24f.apps.googleusercontent.com";
// const GOOGLE_SECRET = "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";
// const GOOGLE_REFRESHTOKEN =
//   "1//04v33T2V5HnMJCgYIARAAGAQSNwF-L9IrhoVUxDKC4XEb3JxisBd0OKOpDPT-EEQ2vC_u5CCNvVE4dJAgYoxpbFxrZF7hGkpx-0Y";
// const GOOGLE_URL = "https://developers.google.com/oauthplayground/";
// const oAuth = new google.auth.OAuth2(GOOGLE_ID, GOOGLE_SECRET, GOOGLE_URL);
// oAuth.setCredentials({ access_token: GOOGLE_REFRESHTOKEN });
// const URL: string = "http://localhost:3344";
// export const openingMail = async (user: any) => {
//   try {
//     const accessToken: any = (await oAuth.getAccessToken()).token;
//     const transport = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         type: "OAuth2",
//         user: "udidagodswill7@gmail.com",
//         clientId: GOOGLE_ID,
//         clientSecret: GOOGLE_SECRET,
//         refreshToken: GOOGLE_REFRESHTOKEN,
//         accessToken,
//       },
//     });
//     const data = {
//       email: user.email,
//       userName: user.name,
//       url: `${URL}/api/${user.id}/verify`,
//     };
//     const locateFile = path.join(__dirname, "../views/request.ejs");
//     const readFile = await ejs.renderFile(locateFile, data);
//     const mailer = {
//       // from: "Account Opening 🚀🚀🚀 <udidagodswill7@gmail.com>",
//       from: user?.email,
//       to: user?.email,
//       subject: "Account Opening",
//       html: readFile,
//     };
//     transport.sendMail(mailer);
//   } catch (error:any) {
//     console.log(error.message);
//   }
// };
const googleapis_1 = require("googleapis");
const nodemailer_1 = __importDefault(require("nodemailer"));
const path_1 = __importDefault(require("path"));
const ejs_1 = __importDefault(require("ejs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const GOOGLE_ID = "199704572461-84filrl6gfs1cie7b5bkvspne91bbj0q.apps.googleusercontent.com";
const GOOGLE_SECRET = "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";
const GOOGLE_URL = "https://developers.google.com/oauthplayground/";
const GOOGLE_TOKEN = "1//04VN_6MSoOhbqCgYIARAAGAQSNwF-L9IreLEe5iU5Hd_DoUnio4gsaH3CBXozNlnoofjcBGyAVetbZSh0e2DR2rAr6TGXKCyRkgs";
const oAuth = new googleapis_1.google.auth.OAuth2(GOOGLE_ID, GOOGLE_SECRET, GOOGLE_URL);
oAuth.setCredentials({ access_token: GOOGLE_TOKEN });
// const url =   `http://localhost:1111/api/${token}/verify`;
const sendMail = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getAccess = (yield oAuth.getAccessToken()).token;
        const transport = nodemailer_1.default.createTransport({
            service: "gmail",
            auth: {
                type: "OAuth2",
                user: "peterotunuya2@gmail.com",
                clientId: GOOGLE_ID,
                clientSecret: GOOGLE_SECRET,
                refreshToken: GOOGLE_TOKEN,
                accessToken: getAccess,
            },
        });
        const token = jsonwebtoken_1.default.sign({
            id: user.id,
        }, "justRand");
        const url = `http://localhost:1111/api`;
        const choiceData = {
            url: `${url}/${user.token}/verify`,
        };
        const data = path_1.default.join(__dirname, "../views/FirstMailSent.ejs");
        const realData = yield ejs_1.default.renderFile(data, choiceData);
        const mailer = {
            from: "peterotunuya2@gmail.com",
            to: user.email,
            subject: "Congrate",
            html: realData,
        };
        transport.sendMail(mailer);
    }
    catch (error) {
        console.log(error.mesage);
    }
});
exports.sendMail = sendMail;
