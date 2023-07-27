const vehicles = require("../models/vehicle.js");

const addVehicle = async (req, res) => {
  const { vehicleType, color, registrationNumber } = req?.body;

  if (!vehicleType || !color || !registrationNumber) {
    return res
      .status(400)
      .json({ status: false, message: "Please Provide all Fields" });
  }

  const response = await vehicles.create({
    type: vehicleType,
    color,
    registrationNumber,
  });
  if (response) {
    return res
      .status(200)
      .json({ status: true, message: "Add Vehicle Successfully", response });
  } else {
    return res
      .status(400)
      .json({ status: false, message: "Add Vehicle Failed", response: null });
  }
};

const getVehicles = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const perPage = parseInt(req.query.perPage) || 10;

  const totalDocuments = await vehicles.countDocuments({});
  const totalPages = Math.ceil(totalDocuments / perPage);

  const skip = (page - 1) * perPage;
  const response = await vehicles.find({}).skip(skip).limit(perPage);

  res.status(200).json({
    message: "Get All Vehicles",
    status: true,
    response,
    totalPages,
    currentPage: page,
    totalItems: totalDocuments,
  });
};

const deleteVehicle = async (req, res) => {
  const { id } = req.params;
  const deletedVehicle = await vehicles.findByIdAndRemove(id);

  if (!deletedVehicle) {
    return res.status(404).json({
      message: "Vehicle not found",
      status: false,
    });
  }

  res.status(200).json({
    message: "Vehicle deleted successfully",
    status: true,
    deletedVehicle,
  });
};

const updateVehicles = async (req, res) => {
  const { vehicleType, color, registrationNumber, id } = req.body;

  if (!vehicleType || !color || !registrationNumber || !id) {
    return res
      .status(400)
      .json({ status: false, message: "Please Provide all Fields" });
  }

  const updatedVehicle = await vehicles.findByIdAndUpdate(
    id,
    { type: vehicleType, color, registrationNumber },
    { new: true }
  );

  if (!updatedVehicle) {
    return res.status(404).json({
      message: "Vehicle not found",
      status: false,
    });
  }

  res.status(200).json({
    message: "Vehicle updated successfully",
    status: true,
    data: updatedVehicle,
  });
};
module.exports = { addVehicle, getVehicles, deleteVehicle, updateVehicles };
