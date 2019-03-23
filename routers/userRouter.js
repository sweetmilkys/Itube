import express from "express";
import routers from "../routers";
import {
  userDetail,
  changePassword,
  getEditProfile,
  postEditProfile
} from "../controllers/userController";
import { onlyPrivate, uploadAvatar } from "../middlewares";

const userRouter = express.Router();

userRouter.get(routers.editProfile, onlyPrivate, getEditProfile);
userRouter.post(
  routers.editProfile,
  onlyPrivate,
  uploadAvatar,
  postEditProfile
);

userRouter.get(routers.changePassword, onlyPrivate, changePassword);

userRouter.get(routers.userDetail(), userDetail);

export default userRouter;
