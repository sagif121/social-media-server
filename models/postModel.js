const mongoose = require("mongoose");

const PostScheme = new mongoose.Schema({
  content: { type: String },
  dateCreated: { type: String },
  dateUpdated: { type: String },
  image: { type: String },
  createdBy: { type: String },
  userId: { type: String },
  comments: [
    {
      commentContent: { type: String },
      createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    },
  ],
  likes: [{ likedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" } }],
});

const Post = mongoose.model("Post", PostScheme);
module.exports = Post;
