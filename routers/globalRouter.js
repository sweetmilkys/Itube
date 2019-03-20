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
  githubPostLogin,
  facebookLogin,
  facebookCallback,
  facebookPostLogin,
  getMe,
  kakaoLogin,
  kakoCallback,
  kakoPostLogin,
  naverLogin,
  naverPostLogin,
  naverCallback
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

globalRouter.get(routers.github, githubLogin);
globalRouter.get(routers.githubCallback, githubCallback, githubPostLogin);

globalRouter.get(routers.facebook, facebookLogin);
globalRouter.get(routers.facebookCallback, facebookCallback, facebookPostLogin);

globalRouter.get(routers.kakao, kakaoLogin);
globalRouter.get(routers.kakaoCallback, kakoCallback, kakoPostLogin);

globalRouter.get(routers.naver, naverLogin);
globalRouter.get(routers.naverCallbak, naverCallback, naverPostLogin);

globalRouter.get(routers.me, getMe);

export default globalRouter;
