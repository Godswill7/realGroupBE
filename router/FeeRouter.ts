import express from "express"
import { createFeeRecord, viewFeeRecord } from "../controller/FeeStudent"

const Router = express.Router()

Router.route("/create-fee").post(createFeeRecord),
Router.route("/:studentID/viewFee").get(viewFeeRecord)
export default Router