import express from "express";
import routers from "../routers";
import {
  postRegisterView,
  postAddComment
} from "../controllers/videoController";
import { onlyPrivate } from "../middlewares";

const apiRouter = express.Router();

apiRouter.post(routers.registerView, postRegisterView);
apiRouter.post(routers.addComment, onlyPrivate, postAddComment);

export default apiRouter;
