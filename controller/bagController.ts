import { Request, Response } from "express";
import StudentModel from "../model/StudentModel";
import BagModel from "../model/BagModel";
import mongoose from "mongoose";
import { HTTP } from "../error/mainError";

export const createBagRecord = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { bag, email } = req.body;

    const searchUser = await StudentModel.findOne({ email });
    const getBag:number = bag * 200

    if(searchUser) {
      const bagInfo = await BagModel.create({
        bag,
        cash: getBag,
        studentID: searchUser._id,
        student: searchUser,
      });

       console.log(bagInfo);

      const update = await StudentModel.findByIdAndUpdate(
        searchUser._id,
        {
          balance: searchUser?.balance + bagInfo?.cash,
        },
        { new: true }
        );
        console.log(update)
        
      searchUser.bagHistory.push(new mongoose.Types.ObjectId(bagInfo?._id));
      searchUser.save();

      return res.status(201).json({
        message: "Bag created",
        data: bagInfo,
      });
    } else {
      return res.status(404).json({
        message: "user does not exist",
      });
    }
  } catch (error:any) {
    return res.status(404).json({
      message: "Error",
      data:error.message
    });
  }
};

export const viewBagRecord = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { studentID } = req.params;

    const searchUser = await StudentModel.findById(studentID).populate({
      path: "bagHistory",
      options: {
        sort: {
          createdAt: -1,
        },
      },
    });

    return res.status(HTTP.OK).json({
      message: "viewing user bag history",
      data: searchUser,
    });
  } catch (error: any) {
    return res.status(HTTP.BAD).json({
      message: "Error viewing user bag history",
      data: error.message,
    });
  }
};

export const deleteBag = async (req: Request, res: Response) => {
  try {
    const { studentID } = req.params;

    await BagModel.findByIdAndDelete(studentID);

    return res.status(HTTP.DELETE).json({
      message: "Bag History Deleted",
    });
  } catch (error: any) {
    return res.status(HTTP.BAD).json({
      message: "Error deleting bag history",
      data: error.message,
    });
  }
};
