import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import { localsMiddleware } from "./middlewares";
import routers from "./routers";
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";

const app = express();

app.use(helmet()); // secure
app.set("view engine", "pug");
app.use(cookieParser()); // Get cookie and can make to use
app.use(bodyParser.json()); // Checking what contents(JSON TYPE) is user seding to website
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev")); // logger all happen
app.use(localsMiddleware);

app.use(routers.home, globalRouter);
app.use(routers.users, userRouter);
app.use(routers.videos, videoRouter);

export default app;
