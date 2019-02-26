import express from "express";
import router from "../router";
import {
  users,
  userDetail,
  editProfile,
  changePassword
} from "../controllers/userController";

const userRouter = express.Router();

userRouter.get(router.users, users);
userRouter.get(router.userDetail, userDetail);
userRouter.get(router.editProfile, editProfile);
userRouter.get(router.changePassword, changePassword);

export default userRouter;
