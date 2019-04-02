import express from "express";
import routers from "../routers";
import {
  userDetail,
  getEditProfile,
  postEditProfile,
  getChangePassword,
  postChangePassword
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

userRouter.get(routers.changePassword, onlyPrivate, getChangePassword);
userRouter.post(routers.changePassword, onlyPrivate, postChangePassword);

userRouter.get(routers.userDetail(), userDetail);

export default userRouter;
