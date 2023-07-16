const mongoose = require("mongoose");

// Mongoose Schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Mongoose Model
const userModel = mongoose.model("User", userSchema);

// Export Module
module.exports = userModel;