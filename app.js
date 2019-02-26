import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import router from "./router";

const app = express();

app.use(cookieParser()); // cookies middleware
app.use(bodyParser.json()); // body middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet()); // secure middleware
app.use(morgan("dev")); // logger middleware

app.use(router.home, globalRouter);
app.use(router.users, userRouter);
app.use(router.videos, videoRouter);

export default app;
