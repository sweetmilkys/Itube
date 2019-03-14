import express from "express";
import routers from "../routers";
import {
  userDetail,
  editProfile,
  changePassword
} from "../controllers/userController";
import { onlyPrivate } from "../middlewares";

const userRouter = express.Router();

userRouter.get(routers.userDetail(), onlyPrivate, userDetail);
userRouter.get(routers.editProfile(), onlyPrivate, editProfile);
userRouter.get(routers.changePassword(), changePassword);

export default userRouter;
