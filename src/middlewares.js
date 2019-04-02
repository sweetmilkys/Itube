import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";
import routers from "./routers";

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: "ap-northeast-2"
});

// const multerVideo = multer({ dest: "uploads/videos/" });
// const multerAvatar = multer({ dest: "uploads/avatars/" });
const multerVideo = multer({
  storage: multerS3({
    s3,
    acl: "public-read",
    bucket: "danah/wetube/video"
  })
});
const multerAvatar = multer({
  storage: multerS3({
    s3,
    acl: "public-read",
    bucket: "danah/wetube/avartar"
  })
});

export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "WeTube";
  res.locals.routers = routers;
  res.locals.loggedUser = req.user || null;
  next();
};

export const onlyPublic = (req, res, next) => {
  if (req.user) {
    res.redirect(routers.home);
  } else {
    next();
  }
};

export const onlyPrivate = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect(routers.home);
  }
};

export const uploadVideo = multerVideo.single("videoFile");
export const uploadAvatar = multerAvatar.single("avatar");
