import express from "express";
import routers from "../routers";
import {
  getUpload,
  postUpload,
  videoDetail,
  editVideo,
  deleteVideo,
  
} from "../controllers/videoController";

const videoRouter = express.Router();

videoRouter.get(routers.upload, getUpload);
videoRouter.post(routers.upload, postUpload);
videoRouter.get(routers.videoDetail(), videoDetail);
videoRouter.get(routers.editVideo, editVideo);
videoRouter.get(routers.deleteVideo, deleteVideo);

export default videoRouter;
