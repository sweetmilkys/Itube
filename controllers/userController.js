import passport from "passport";
import routers from "../routers";
import User from "../models/User";

export const getJoin = (req, res) => res.render("join", { pageTitle: "Join" });

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

export const googleLoginCallback = async (_, __, ___, profile, done) => {
  const {
    _json: { sub: id, name, email, picture: avatarUrl }
  } = profile;
  try {
    const user = await User.findOne({ $or: [{ email }, { googleId: id }] });
    if (user) {
      user.googleId = id;
      user.avatarUrl = user.avatarUrl ? user.avatarUrl : avatarUrl;
      user.save();
      return done(null, user);
    }
    const newUser = await User.create({
      email,
      name,
      googleId: id,
      avatarUrl
    });
    return done(null, newUser);
  } catch (error) {
    console.log(error);
    return done(error);
  }
};

export const googleLogin = passport.authenticate("google", {
  scope: ["email", "profile"]
});

export const googleCallback = passport.authenticate("google", {
  failureRedirect: routers.login
});

export const kakaoLoginCallback = async (_, __, profile, done) => {
  const {
    _json: {
      id,
      kaccount_email: email,
      properties: { nickname: name, profile_image: avatarUrl }
    }
  } = profile;
  try {
    const user = await User.findOne({ $or: [{ email }, { kakaoId: id }] });
    if (user) {
      user.kakoId = id;
      user.avatarUrl = user.avatarUrl ? user.avatarUrl : avatarUrl;
      user.save();
      return done(null, user);
    }
    const newUser = await User.create({
      email,
      name,
      kakaoId: id,
      avatarUrl
    });
    return done(null, newUser);
  } catch (error) {
    console.log(error);
    return done(error);
  }
};

export const kakaoLogin = passport.authenticate("kakao");

export const kakoCallback = passport.authenticate("kakao", {
  failureRedirect: routers.login
});

export const naverLoginCallback = async (_, __, profile, done) => {
  const {
    _json: { id, nickname: name, email, profile_image: avatarUrl }
  } = profile;
  try {
    const user = await User.findOne({ $or: [{ email }, { naverId: id }] });
    if (user) {
      user.naverId = id;
      user.avatarUrl = user.avatarUrl ? user.avatarUrl : avatarUrl;
      user.save();
      return done(null, user);
    }
    const newUser = await User.create({
      email,
      name,
      naverId: id,
      avatarUrl
    });
    return done(null, newUser);
  } catch (error) {
    console.log(error);
    return done(error);
  }
};

export const naverLogin = passport.authenticate("naver");

export const naverCallback = passport.authenticate("naver", {
  failureRedirect: routers.login
});

export const facebookLoginCallback = async (_, __, profile, cb) => {
  const {
    _json: { id, name, email }
  } = profile;
  try {
    const user = await User.findOne({ $or: [{ email }, { facebookId: id }] });
    if (user) {
      user.facebookId = id;
      user.avatarUrl = user.avatarUrl
        ? user.avatarUrl
        : `https://graph.facebook.com/${id}/picture?type=large`;
      user.save();
      return cb(null, user);
    }
    const newUser = await User.create({
      email,
      name,
      facebookId: id,
      avatarUrl: `https://graph.facebook.com/${id}/picture?type=large`
    });
    return cb(null, newUser);
  } catch (error) {
    console.log(error);
    return cb(error);
  }
};

export const facebookLogin = passport.authenticate("facebook");

export const facebookCallback = passport.authenticate("facebook", {
  failureRedirect: routers.login
});

export const githubLoginCallback = async (_, __, profile, done) => {
  const {
    _json: { id, name, email, avatar_url: avatarUrl }
  } = profile;
  try {
    const user = await User.findOne({ $or: [{ email }, { githubId: id }] });
    if (user) {
      user.githubId = id;
      user.avatarUrl = user.avatarUrl ? user.avatarUrl : avatarUrl;
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
  failureRedirect: routers.login
});
export const socialPostLogin = (req, res) => res.redirect(routers.home);

export const getMe = (req, res) => {
  res.render("userDetail", { pageTitle: "User Detail", user: req.user });
};

export const userDetail = async (req, res) => {
  const {
    params: { id }
  } = req;
  try {
    const user = await User.findById(id);
    res.render("userDetail", { pageTitle: "User Detail", user });
  } catch (error) {
    console.log(error);
    res.redirect(routers.home);
  }
};

export const getEditProfile = (req, res) => {
  res.render("editProfile", { pageTitle: "Edit Profile" });
};

export const postEditProfile = async (req, res) => {
  const {
    body: { name, email },
    file
  } = req;
  try {
    await User.findByIdAndUpdate(req.user.id, {
      name,
      email,
      avatarUrl: file ? file.path : req.user.avatarUrl
    });
    res.redirect(routers.me);
  } catch (error) {
    console.log(error);
    res.render("editProfile", { pageTitle: "Edit Profile" });
  }
};

export const changePassword = (req, res) =>
  res.render("changePassword", { pageTitle: "Change Password" });

export const logout = (req, res) => {
  req.logout();
  res.redirect(routers.home);
};
