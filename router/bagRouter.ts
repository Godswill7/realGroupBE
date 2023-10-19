import express from "express";

import { createBagRecord, deleteBag, viewBagRecord } from "../controller/bagController";

const Router = express.Router();

Router.route("/create-bag-record").post(createBagRecord);
Router.route("/:studentID/view-student-bag").get(viewBagRecord);
Router.route("/:bagID/delete-bag").delete(deleteBag);

export default Router;
