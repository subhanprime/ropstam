const express = require("express");
const VehicleRouter = express.Router();
const { addVehicle,getVehicles,deleteVehicle ,updateVehicles} = require("../controllers/vehicle.controllers.js");

const catchAsync = require("../middleware/catchAsync.js");
const verifyJwt = require("../middleware/verifyJwt.js");

VehicleRouter.post("/addVehicle", verifyJwt, catchAsync(addVehicle));
VehicleRouter.get("/getVehicle",  catchAsync(getVehicles));
VehicleRouter.delete("/deleteVehicle/:id", verifyJwt, catchAsync(deleteVehicle));
VehicleRouter.put("/updateVehicles", verifyJwt, catchAsync(updateVehicles));

module.exports = VehicleRouter;
