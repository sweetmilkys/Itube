import express from "express";
import router from "../router";
import { home, search } from "../controllers/videoController";
import { join, login, logout } from "../controllers/userController";

const globalRouter = express.Router();

globalRouter.get(router.home, home);
globalRouter.get(router.join, search);
globalRouter.get(router.login, join);
globalRouter.get(router.logout, login);
globalRouter.get(router.search, logout);

export default globalRouter;
