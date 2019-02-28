import express from "express";
import routers from "../routers";
import {
  videos,
  videoDetail,
  editVideo,
  deleteVideo,
  upload
} from "../controllers/videoController";

const videoRouter = express.Router();

videoRouter.get(routers.upload, upload);
videoRouter.get(routers.videoDetail, videoDetail);
videoRouter.get(routers.editVideo, editVideo);
videoRouter.get(routers.deleteVideo, deleteVideo);

export default videoRouter;
