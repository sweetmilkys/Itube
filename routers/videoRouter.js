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
import { uploadVideo } from "../middlewares";

const videoRouter = express.Router();

videoRouter.get(routers.upload, getUpload);
videoRouter.post(routers.upload, uploadVideo, postUpload);

videoRouter.get(routers.videoDetail(), videoDetail);

videoRouter.get(routers.editVideo(), getEditVideo);
videoRouter.post(routers.editVideo(), postEditVideo);

videoRouter.get(routers.deleteVideo, deleteVideo);

export default videoRouter;
