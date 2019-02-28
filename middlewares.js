import routers from "./routers";

export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "WeTube";
  res.locals.routers = routers;
  next();
};
