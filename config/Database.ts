import mongoose from "mongoose"
import dotenv from "dotenv";
dotenv.config();

const mongooseString: string = process.env.POLLUTION_DB!;

export const dbConnect = () => {
  mongoose.connect(mongooseString).then(() => {
    console.log("connected to our database");
  });
};
