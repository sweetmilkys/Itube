import passport from "passport";
import routers from "../routers";
import User from "../models/User";

export const getJoin = (req, res) => res.render("join", { pageTitle: "Join" });

export const postJoin = async (req, res, next) => {
  const {
    body: { name, email, password, password2 }
  } = req;
  if (password !== password2) {
    req.flash("info", "비밀번호가 일치하지 않습니다.");
    res.redirect(routers.join);
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
  failureFlash: "이메일 혹은 비밀번호를 확인해주시기 바랍니다.",
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
  failureFlash: "이메일 혹은 비밀번호를 확인해주시기 바랍니다.",
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
  failureFlash: "이메일 혹은 비밀번호를 확인해주시기 바랍니다.",
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
  failureFlash: "이메일 혹은 비밀번호를 확인해주시기 바랍니다.",
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
  failureFlash: "이메일 혹은 비밀번호를 확인해주시기 바랍니다.",
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
  failureFlash: "이메일 혹은 비밀번호를 확인해주시기 바랍니다.",
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
    const user = await User.findById(id).populate("videos");
    res.render("userDetail", { pageTitle: "User Detail", user });
  } catch (error) {
    console.log(error);
    req.flash("error", "사용자를 찾을 수 없습니다.");
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
      // avatarUrl: file ? file.path : req.user.avatarUrl
      avatarUrl: file ? file.location : req.user.avatarUrl
    });
    res.redirect(routers.me);
  } catch (error) {
    console.log(error);
    req.flash("error", "업데이트에 실패했습니다.");
    res.redirect(routers.editProfile);
  }
};

export const getChangePassword = (req, res) =>
  res.render("changePassword", { pageTitle: "Change Password" });

export const postChangePassword = async (req, res) => {
  const {
    body: { oldPassword, newPassword, newPassword1 }
  } = req;
  try {
    if (newPassword !== newPassword1) {
      req.flash("error", "비밀번호가 일치하지 않습니다.");
      res.status(400);
      res.redirect(`/users/${routers.changePassword}`);
      return;
    }
    await req.user.changePassword(oldPassword, newPassword);
    res.redirect(routers.me);
  } catch (error) {
    console.log(error);
    req.flash("error", "비밀번호 변경에 실패 했습니다.");
    res.status(400);
    res.redirect(`/users/${routers.changePassword}`);
  }
};

export const logout = (req, res) => {
  req.flash("info", "로그아웃되었습니다.");
  req.logout();
  res.redirect(routers.home);
};
