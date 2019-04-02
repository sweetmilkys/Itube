import express from "express";
import routers from "../routers";
import {
  getUpload,
  postUpload,
  videoDetail,
  getEditVideo,
  postEditVideo,
  deleteVideo
} from "../controllers/videoController";
import { uploadVideo, onlyPrivate } from "../middlewares";

const videoRouter = express.Router();

videoRouter.get(routers.upload, onlyPrivate, getUpload);
videoRouter.post(routers.upload, onlyPrivate, uploadVideo, postUpload);

videoRouter.get(routers.videoDetail(), videoDetail);

videoRouter.get(routers.editVideo(), onlyPrivate, getEditVideo);
videoRouter.post(routers.editVideo(), onlyPrivate, postEditVideo);

videoRouter.get(routers.deleteVideo(), onlyPrivate, deleteVideo);

export default videoRouter;
