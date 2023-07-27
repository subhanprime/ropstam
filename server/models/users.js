const mongoose = require("mongoose");

const user = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
    required: "Email address is required",
  },
  password: { type: String, trim: true },
  refreshToken: { type: String },
  verified: {
    type: Boolean,
    default: false,
  },
});

const userModal = mongoose.model("dummyUsers", user);

module.exports = userModal;
