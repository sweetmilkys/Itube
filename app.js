import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import passport from "passport";
import session from "express-session";
import { localsMiddleware } from "./middlewares";
import routers from "./routers";
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";

import "./passport";

const app = express();

app.use(helmet()); // secure
app.set("view engine", "pug");
app.use("/uploads", express.static("uploads")); // delivery file
app.use("/static", express.static("static"));
app.use(cookieParser()); // Get cookie and can make to use
app.use(bodyParser.json()); // Checking what contents(JSON TYPE) is user seding to website
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev")); // logger all happen
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: true,
    saveUninitialized: false
  })
);
// https://randomkeygen.com/
app.use(passport.initialize());
app.use(passport.session());

app.use(localsMiddleware);

app.use(routers.home, globalRouter);
app.use(routers.users, userRouter);
app.use(routers.videos, videoRouter);

export default app;
