import express from "express";
import routers from "../routers";
import {
  userDetail,
  editProfile,
  changePassword
} from "../controllers/userController";

const userRouter = express.Router();

userRouter.get(routers.userDetail(), userDetail);
userRouter.get(routers.editProfile(), editProfile);
userRouter.get(routers.changePassword(), changePassword);

export default userRouter;
