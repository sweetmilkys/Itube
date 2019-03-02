import express from "express";
import routers from "../routers";
import { home, search } from "../controllers/videoController";
import {
  getJoin,
  postJoin,
  login,
  logout
} from "../controllers/userController";

const globalRouter = express.Router();

globalRouter.get(routers.home, home);
globalRouter.get(routers.search, search);
globalRouter.get(routers.join, getJoin);
globalRouter.post(routers.join, postJoin);
globalRouter.get(routers.login, login);
globalRouter.get(routers.logout, logout);

export default globalRouter;
