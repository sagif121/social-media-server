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

// exports.genToken = (_userId) => {
//   let token = jwt.sign({ _id: _userId }, "SAGIPASS", { expiresIn: "60days" });
//   return token;
// };

// exports.validUsers = (_bodyData) => {
//   let joiSchema = joi.object({
//     userName: joi.string().min(2).max(99).required(),
//     email: joi.string().min(10).max(300).required().email(),
//     password: joi.string().min(2).max(200).required(),
//     nickName: joi.string().min(2).max(300),
//   });

//   return joiSchema.validate(_bodyData);
// };

// exports.validLogin = (_bodyData) => {
//   let joiSchema = joi.object({
//     email: joi.string().min(10).max(300).required().email(),
//     password: joi.string().min(2).max(200).required(),
//   });

//   return joiSchema.validate(_bodyData);
// };
