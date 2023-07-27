const express = require("express");
const rootRouter = express.Router();
const userRouter = require("../routes/user.routes.js");
const VehicleRouter = require('./vehicle.routes.js')

rootRouter.use("/", userRouter);
rootRouter.use("/", VehicleRouter);
module.exports = rootRouter;
