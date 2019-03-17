import passport from "passport";
import routers from "../routers";
import User from "../models/User";

export const getJoin = (req, res) => {
  res.render("join", { pageTitle: "Join" });
};

export const postJoin = async (req, res, next) => {
  const {
    body: { name, email, password, password2 }
  } = req;
  if (password !== password2) {
    res.status(400);
  } else {
    try {
      const user = await User({
        name,
        email
      });
      await User.register(user, password);
      next();
    } catch (error) {
      console.log(error);
      res.redirect(routers.home);
    }
  }
};

export const getlogin = (req, res) =>
  res.render("login", { pageTitle: "Log In" });

export const postLogin = passport.authenticate("local", {
  failureRedirect: routers.login,
  successRedirect: routers.home
});

export const githubLoginCallback = async (_, __, profile, done) => {
  const {
    _json: { id, avatar_url: avatarUrl, name, email }
  } = profile;
  try {
    const user = await User.findOne({ email });
    if (user) {
      user.githubId = id;
      user.save();
      return done(null, user);
    }
    const newUser = await User.create({
      name,
      email,
      avatarUrl,
      githubId: id
    });
    return done(null, newUser);
  } catch (error) {
    console.log(error);
    return done(error);
  }
};

export const githubLogin = passport.authenticate("github", {
  scope: ["user:email"]
});

export const githubCallback = passport.authenticate("github", {
  failureRedirect: "/login"
});

export const githubPostLogin = (req, res) => {
  res.redirect(routers.home);
};

export const logout = (req, res) => {
  req.logout();
  res.redirect(routers.home);
};

export const userDetail = (req, res) =>
  res.render("userDetail", { pageTitle: "User Detail" });

export const editProfile = (req, res) =>
  res.render("editProfile", { pageTitle: "Edit Profile" });

export const changePassword = (req, res) =>
  res.render("changePassword", { pageTitle: "Change Password" });
