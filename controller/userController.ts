import bcrypt from "bcrypt";
import { Request, Response } from "express";
import StudentModel from "../model/StudentModel";
import { HTTP } from "../error/mainError";

export const createUser = async (req: Request, res: Response) => {
  try {
    const { email, password, studentName } = req.body;
    const encrypt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, encrypt);

    const user = await StudentModel.create({
      email,
      password: hash,
      studentName,
    });

    return res.status(HTTP.CREATE).json({
      message: "user created successfully",
      data: user,
    });
  } catch (error: any) {
    return res.status(HTTP.BAD).json({
        message: "Error creating user",
        data:error.message
    });
  }
};

export const signInUser = async (req: Request, res: Response) => {
  try {
    const {studentID} = req.params
    
    const { email, password } = req.body;

    const user = await StudentModel.findById(studentID)
    
    if (user) {
      const checkPass = await bcrypt.compare(password, user?.password!)
      if (checkPass) {
        return res.status(HTTP.OK).json({
          message: `Welcome back ${user.studentName}`,
          data:user._id
        })
      } else {
        return res.status(HTTP.BAD).json({
          message:"Incorrect password"
        })
      }
      
    } else {
      return res.status(HTTP.BAD).json({
        message:"User does not exist"
      })
    }
  } catch (error: any) {
    return res.status(HTTP.BAD).json({
      message: "Error signing in user",
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

            const update = await StudentModel.findByIdAndUpdate(
              studentID
            ).updateOne({
              schoolName,
              phoneNumber,
              HouseAddress,
              gender,
            }, {
                new:true
            });

            await user.save()

            return res.status(HTTP.UPDATE).json({
                message: "updated successfully",
                data:update
            })

        } else {
            return res.status(HTTP.BAD).json({
                message:"User does not exist"
            })
        }
  } catch (error: any) {
    return res.status(HTTP.BAD).json({
      message: "Error updating user",
      data: error.message,
    });
  }
};

export const deleteUser = async (req:Request,res:Response) => {
    try {
        const { studentID } = req.params
        
        await StudentModel.findByIdAndDelete(studentID)

        return res.status(HTTP.DELETE).json({
            message: "user deleted successfully",
        })
    } catch (error:any) {
        return res.status(HTTP.DELETE).json({
            message: "error deleting user",
            data:error.message
        })
    }
}

export const deleteAllUser = async (req:Request,res:Response) => {
    try {
        
     await StudentModel.deleteMany()

        return res.status(HTTP.DELETE).json({
            message: "All user deleted successfully",
        })
    } catch (error:any) {
        return res.status(HTTP.DELETE).json({
            message: "error deleting all user",
            data:error.message
        })
    }
}
