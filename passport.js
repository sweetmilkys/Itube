import passport from "passport";
import GithubStrategy from "passport-github2";
import User from "./models/User";
import { githubLoginCallback } from "./controllers/userController";
import routers from "./routers";

passport.use(User.createStrategy());

passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: `http://localhost:4000${routers.gitHubCallback}`
    },
    githubLoginCallback
  )
);

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
