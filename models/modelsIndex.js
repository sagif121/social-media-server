const mongoose = require("mongoose");
const User = require("./userModel");
const Post = require("./postModel");
const Chat = require("./chatModel");

module.exports = {
  User,
  Post,
  Chat,
};
