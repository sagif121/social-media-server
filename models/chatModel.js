const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  username: { type: String },
  conntent: { type: String },
});

const Chat = mongoose.model("Chat", chatSchema);
module.exports = Chat;
