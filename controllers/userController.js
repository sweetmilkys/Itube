import routers from "../routers";

export const getJoin = (req, res) => {
  res.render("join", { pageTitle: "Join" });
};

export const postJoin = (req, res) => {
  const {
    body: { name, email, password, password2 }
  } = req;
  if (password !== password2) {
    res.status(400);
  } else {
    res.redirect(routers.home);
  }
  res.render("join", { pageTitle: "Join" });
};

export const getlogin = (req, res) =>
  res.render("login", { pageTitle: "Log In" });
  
export const postLogin = (req, res) => {
  res.redirect(routers.home);
};

export const logout = (req, res) => {
  res.redirect(routers.home);
}

export const userDetail = (req, res) =>
  res.render("userDetail", { pageTitle: "User Detail" });

export const editProfile = (req, res) =>
  res.render("editProfile", { pageTitle: "Edit Profile" });

export const changePassword = (req, res) =>
  res.render("changePassword", { pageTitle: "Change Password" });
