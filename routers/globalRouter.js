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
  facebookLogin,
  facebookCallback,
  kakaoLogin,
  kakoCallback,
  naverLogin,
  naverCallback,
  googleLogin,
  googleCallback,
  socialPostLogin,
  getMe
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

globalRouter.get(routers.google, onlyPublic, googleLogin);
globalRouter.get(
  routers.googleCallback,
  onlyPublic,
  googleCallback,
  socialPostLogin
);

globalRouter.get(routers.kakao, onlyPublic, kakaoLogin);
globalRouter.get(
  routers.kakaoCallback,
  onlyPublic,
  kakoCallback,
  socialPostLogin
);

globalRouter.get(routers.naver, onlyPublic, naverLogin);
globalRouter.get(
  routers.naverCallback,
  onlyPublic,
  naverCallback,
  socialPostLogin
);

globalRouter.get(routers.facebook, onlyPublic, facebookLogin);
globalRouter.get(
  routers.facebookCallback,
  onlyPublic,
  facebookCallback,
  socialPostLogin
);

globalRouter.get(routers.github, onlyPublic, githubLogin);
globalRouter.get(
  routers.githubCallback,
  onlyPublic,
  githubCallback,
  socialPostLogin
);

globalRouter.get(routers.me, getMe);

export default globalRouter;
