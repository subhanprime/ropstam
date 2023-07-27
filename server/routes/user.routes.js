const express = require("express");
const userRouter = express.Router();
const {
  userSignup,
  userLogin,
  userInfo,
} = require("../controllers/user.controllers.js");
const refreshToken = require("../controllers/refresh.controllers.js");
const catchAsync = require("../middleware/catchAsync.js");
const verifyJwt = require("../middleware/verifyJwt.js");

userRouter.post("/register", catchAsync(userSignup));
userRouter.post("/login", catchAsync(userLogin));
userRouter.get("/refresh", catchAsync(refreshToken));

userRouter.get("/userInfo", verifyJwt, catchAsync(userInfo));

module.exports = userRouter;
