import express from "express";
import router from "../router";
import {
  videos,
  videoDetail,
  editVideo,
  deleteVideo,
  upload
} from "../controllers/videoController";

const videoRouter = express.Router();

videoRouter.get(router.videos, videos);
videoRouter.get(router.upload, upload);
videoRouter.get(router.videoDetail, videoDetail);
videoRouter.get(router.editVideo, editVideo);
videoRouter.get(router.deleteVideo, deleteVideo);

export default videoRouter;
