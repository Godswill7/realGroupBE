import bcrypt from "bcrypt";
import { Request, Response } from "express";
import StudentModel from "../model/StudentModel";
import { HTTP } from "../error/mainError";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { sendMail } from "../utils/email";

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
        return res.status(HTTP.OK).json({
          message: `Welcome back ${student.studentName}`,
          data: student._id,
        });
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
    const { studentID,token } = req.params;
 
    const user = await StudentModel.findById(studentID)

    if (user) {
      const verify = await StudentModel.findByIdAndUpdate(studentID)
     
      if (user.verify === false && user.token !== "") {
         const ver = await verify?.updateOne(
           {
             verify: true,
             token: "",
           },
           {
             new: true,
           }
        );
        
        return res.status(HTTP.UPDATE).json({
          message: "verify successful",
          data:ver?.id
        });

      } else {
        return res.status(HTTP.BAD).json({
          message: "unable to verify",
        })
      }
  
} else {
      return res.status(HTTP.BAD).json({
    message:"User does not exist"
  })
}

 
  } catch (error: any) {
    return res.status(HTTP.BAD).json({
      message: "Error verifying user",
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

      const update = await StudentModel.findByIdAndUpdate(studentID).updateOne(
        {
          schoolName,
          phoneNumber,
          HouseAddress,
          gender,
        },
        {
          new: true,
        }
      );

      await user.save();

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
