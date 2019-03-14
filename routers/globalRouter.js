import express from "express";
import routers from "../routers";
import { home, search } from "../controllers/videoController";
import {
  getJoin,
  postJoin,
  getlogin,
  postLogin,
  logout
} from "../controllers/userController";
import { onlyPublic } from "../middlewares";

const globalRouter = express.Router();

globalRouter.get(routers.join, onlyPublic, getJoin);
globalRouter.post(routers.join, onlyPublic, postJoin, postLogin);

globalRouter.get(routers.login, onlyPublic, getlogin);
globalRouter.post(routers.login, onlyPublic, postLogin);

globalRouter.get(routers.home, home);
globalRouter.get(routers.search, search);
globalRouter.get(routers.logout, onlyPublic, logout);

export default globalRouter;
