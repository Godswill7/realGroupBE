import  mongoose from "mongoose"
import { iBag } from "../utils/interface"

interface iBagData extends iBag, mongoose.Document {}

const bagModel = new mongoose.Schema<iBagData>(
  {
    bag: {
      type: Number,
    },
    cash: {
      type: Number,
    },
    studentID: {
      type: String,
    },
    student: {
      type: mongoose.Types.ObjectId,
      ref: "bags",
    },
  },
  { timestamps: true }
);

export default mongoose.model<iBagData>("bags", bagModel);