import express from "express";
import { createUser, deleteAllUser, deleteUser, getAllUser, getUser, signInUser, updateUserInfo } from "../controller/userController";


const router = express.Router()

router.route("/create").post(createUser)
router.route("/sign-in").post(signInUser)
router.route("/:studentID/get-one").get(getUser)
router.route("/get-all").get(getAllUser)
router.route("/:studentID/update-one").patch(updateUserInfo)
router.route("/:studentID/delete-one").delete(deleteUser)
router.route("/delete-all").delete(deleteAllUser)

export default router