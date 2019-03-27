import express from "express";
import routers from "../routers";
import { postRegisterView } from "../controllers/videoController";

const apiRouter = express.Router();

apiRouter.post(routers.registerView, postRegisterView);

export default apiRouter;
