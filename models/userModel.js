const mongoose = require("mongoose");
const joi = require("joi");
const { string } = require("joi");
const jwt = require("jsonwebtoken");
const userScheme = new mongoose.Schema({
  email: { type: String },
  firstName: { type: String },
  password: { type: String },
  lastName: { type: String },
  image: { type: String },
});

const User = mongoose.model("User", userScheme);
module.exports = User;
