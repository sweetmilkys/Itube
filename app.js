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

app.set("view engine", "pug");
app.use(cookieParser()); // Get cookie and can make to use
app.use(bodyParser.json()); // Checking what contents(JSON TYPE) is user seding to website
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet()); // secure
app.use(morgan("dev")); // logger all happen

app.use(router.home, globalRouter);
app.use(router.users, userRouter);
app.use(router.videos, videoRouter);

export default app;
