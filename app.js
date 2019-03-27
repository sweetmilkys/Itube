import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import passport from "passport";
import mongoes from "mongoose";
import session from "express-session";
import mongoStore from "connect-mongo";
import { localsMiddleware } from "./middlewares";
import routers from "./routers";
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import apiRouter from "./routers/apiRouter";

import "./passport";

const app = express();

const CokieStore = mongoStore(session);

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
    saveUninitialized: false,
    store: new CokieStore({ mongooseConnection: mongoes.connection })
  })
);
// https://randomkeygen.com/
app.use(passport.initialize());
app.use(passport.session());

app.use(localsMiddleware);

app.use(routers.home, globalRouter);
app.use(routers.users, userRouter);
app.use(routers.videos, videoRouter);
app.use(routers.api, apiRouter);

export default app;
