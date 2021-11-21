const express = require("express");
const session = require("express-session");
const router = express.Router();
const { Post, User, Chat } = require("../models/modelsIndex");
const { auth } = require("../autth/auth");

router.get("/:chat", async (req, res) => {
  let { postId } = req.params;

  let allPosts = await Chat.find({ conntent: postId });

  res.send(allPosts);
});
module.exports = router;
