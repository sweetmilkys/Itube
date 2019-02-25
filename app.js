import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import { userRouter } from "./router";
const app = express();

const handleHome = (req, res) => res.send("hello world");

const handleProfile = (req, res) => res.send("You are on my profile");

app.use(cookieParser()); // cookies middleware
app.use(bodyParser.json()); // body middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet()); // secure middleware
app.use(morgan("dev")); // logger middleware

app.get("/", handleHome); // respond with "hello world" when a GET request is made to the homepage

app.get("/profile", handleProfile);

app.use("/user", userRouter);

export default app;
