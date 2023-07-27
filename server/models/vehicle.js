const mongoose = require("mongoose");

const vehicleSchema = mongoose.Schema({
  type: {
    type: String,
    enum: ["car", "bus", "sudan", "suv", "hatchback"],
  },
  color: {
    type: String,
  },
  registrationNumber: {
    type: String,
  },
});

const vehicles = mongoose.model("vehicles", vehicleSchema);

module.exports = vehicles;
