import express from "express";
import routers from "../routers";
import { home, search } from "../controllers/videoController";
import {
  getJoin,
  postJoin,
  getlogin,
  postLogin,
  logout,
  githubLogin,
  githubCallback,
  githubPostLogin
} from "../controllers/userController";
import { onlyPublic, onlyPrivate } from "../middlewares";

const globalRouter = express.Router();

globalRouter.get(routers.join, onlyPublic, getJoin);
globalRouter.post(routers.join, onlyPublic, postJoin, postLogin);

globalRouter.get(routers.login, onlyPublic, getlogin);
globalRouter.post(routers.login, onlyPublic, postLogin);

globalRouter.get(routers.home, home);
globalRouter.get(routers.search, search);
globalRouter.get(routers.logout, onlyPrivate, logout);

globalRouter.get(routers.gitHub, githubLogin);

globalRouter.get(routers.gitHubCallback, githubCallback, githubPostLogin);

export default globalRouter;
