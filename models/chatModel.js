const mongoose = require("mongoose");
// const joi = require("joi");
// const { string } = require("joi");
// const jwt = require("jsonwebtoken");
const chatSchema = new mongoose.Schema({
  username: { type: String },
  conntent: { type: String },
});

const Chat = mongoose.model("Chat", chatSchema);
module.exports = Chat;
