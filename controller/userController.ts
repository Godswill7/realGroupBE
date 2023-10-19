import bcrypt from "bcrypt";
import { Request, Response } from "express";
import StudentModel from "../model/StudentModel";
import { HTTP } from "../error/mainError";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { sendMail } from "../utils/email";
import https from "https";

export const createUser = async (req: Request, res: Response) => {
  try {
    const { email, password, studentName } = req.body;
    const encrypt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, encrypt);

    const tokenValue = crypto.randomBytes(10).toString("hex");
    const token = jwt.sign(tokenValue, "justRand");

    const user = await StudentModel.create({
      email,
      password: hash,
      studentName,
      token,
      balance: 0,
      studentImage: await email.charAt().toUpperCase(),
    });
    sendMail(user).then(() => {
      console.log("Mail Sent...");
    });
    return res.status(HTTP.CREATE).json({
      message: "user created successfully",
      data: user,
    });
  } catch (error: any) {
    return res.status(HTTP.BAD).json({
      message: "Error creating user",
      data: error.message,
    });
  }
};

export const signInUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const student = await StudentModel.findOne({ email });

    if (student) {
      const checkPass = await bcrypt.compare(password, student?.password!);
      if (checkPass) {
        if (student?.verify && student?.token === "") {
          console.log(student?.verify)
          console.log(student?.token)
          const token = jwt.sign({ id: student._id }, "code");
          return res.status(HTTP.OK).json({
            message: `Welcome back ${student.studentName}`
          });
        } else {
          return res.status(HTTP.BAD).json({
            message: "go and verify your email",
          });
        }
      } else {
        return res.status(HTTP.BAD).json({
          message: "Incorrect password",
        });
      }
    } else {
      return res.status(HTTP.BAD).json({
        message: "User does not exist",
      });
    }
  } catch (error: any) {
    return res.status(HTTP.BAD).json({
      message: "Error signing in user",
      data: error.message,
    });
  }
};

export const VerifyStudent = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { token } = req.params;

    const getStudentId: any = jwt.verify(
      token,
      "code",
      (err:any, payload:any) => {
        if (err) {
          return err;
        } else {
          return payload;
        }
      }
    );
console.log(getStudentId)
    const student:any = await StudentModel.findByIdAndUpdate(
      getStudentId?.id,
      { token: "", verify: true },
      { new: true }
    );

    return res.status(HTTP.OK).json({
      message: "verified successfully",
      data: student?.id,
    });
  } catch (error: any) {
    return res.status(HTTP.BAD).json({
      message: "error",
      data: error.message,
    });
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const { studentID } = req.params;

    const user = await StudentModel.findById(studentID);

    return res.status(HTTP.OK).json({
      message: "user found successfully",
      data: user,
    });
  } catch (error: any) {
    return res.status(HTTP.BAD).json({
      message: "Error finding user",
      data: error.message,
    });
  }
};

export const getAllUser = async (req: Request, res: Response) => {
  try {
    const user = await StudentModel.find();

    return res.status(HTTP.OK).json({
      message: "All user found successfully",
      data: user,
    });
  } catch (error: any) {
    return res.status(HTTP.BAD).json({
      message: "Error finding all user",
      data: error.message,
    });
  }
};

export const updateUserInfo = async (req: Request, res: Response) => {
  try {
    const { studentID } = req.params;

    const user = await StudentModel.findById(studentID);

    if (user) {
      const { schoolName, phoneNumber, HouseAddress, gender } = req.body;

      const update = await StudentModel.findByIdAndUpdate(studentID, {
        schoolName,
        phoneNumber,
        HouseAddress, 
        gender
        
      }, { new: true })
      
      return res.status(HTTP.UPDATE).json({
        message: "updated successfully",
        data: update,
      });
    } else {
      return res.status(HTTP.BAD).json({
        message: "User does not exist",
      });
    }
  } catch (error: any) {
    return res.status(HTTP.BAD).json({
      message: "Error updating user",
      data: error.message,
    });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { studentID } = req.params;

    await StudentModel.findByIdAndDelete(studentID);

    return res.status(HTTP.DELETE).json({
      message: "user deleted successfully",
    });
  } catch (error: any) {
    return res.status(HTTP.DELETE).json({
      message: "error deleting user",
      data: error.message,
    });
  }
};

export const deleteAllUser = async (req: Request, res: Response) => {
  try {
    await StudentModel.deleteMany();

    return res.status(HTTP.DELETE).json({
      message: "All user deleted successfully",
    });
  } catch (error: any) {
    return res.status(HTTP.DELETE).json({
      message: "error deleting all user",
      data: error.message,
    });
  }
};

export const checkOutWithPayStack = async (req: Request, res: Response) => {
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
        Authorization:
          "Bearer sk_test_69da8b749744f32de8dd9359178903450d74b650",
        "Content-Type": "application/json",
      },
    };

    const ask = https
      .request(options, (resp) => {
        let data = "";
        resp.on("data", (chunk) => {
          data += chunk;
        });

        resp.on("end", () => {
          console.log(JSON.parse(data));
          res.status(HTTP.OK).json({
            message: "Payment successful",
            data: JSON.parse(data),
          });
        });
      })
      .on("error", (error: any) => {
        console.error(error.message);
      });

    ask.write(params);
    ask.end();
  } catch (error: any) {
    return res.status(HTTP.BAD).json({
      message: "Error making Payment",
      data: error.message,
    });
  }
};
