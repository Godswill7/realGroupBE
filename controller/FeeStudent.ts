import { Request, Response } from "express";
import mongoose from "mongoose";
import StudentModel from "../model/StudentModel";
import FeeModel from "../model/FeeModel";

export const createFeeRecord = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { cash, email } = req.body;

    const searchUser = await StudentModel.findOne({ email });
    
    if (searchUser) {
      const bagInfo = await FeeModel.create({
        cash: parseInt(cash),
        studentID: searchUser?._id,
        schoolName: searchUser?.schoolName,
      });

      console.log(bagInfo)
      await StudentModel.findByIdAndUpdate(
        searchUser._id,
        {
          balance: (searchUser?.balance) - bagInfo?.cash,
        },

        { new: true }
      );
      searchUser.feeHistory.push(new mongoose.Types.ObjectId(bagInfo?._id));
      searchUser.save();

      return res.status(201).json({
        message: "created",
        data: bagInfo,
      });

      
    } else {
      return res.status(404).json({
        message: "no student match",
      });
    }
  } catch (error: any) {
    return res.status(404).json({
      message: "Error",
      data: error.message,
    });
  }
};

export const viewFeeRecord = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { studentID } = req.params;

    const searchUser = await StudentModel.findById(studentID).populate({
      path: "feeHistory",
      options: {
        sort: {
          createdAt: -1,
        },
      },
    });

    return res.status(201).json({
      message: "created",
      data: searchUser,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Error",
    });
  }
};
