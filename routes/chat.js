const express = require("express");
const session = require("express-session");
const router = express.Router();
const { Post, User, Chat } = require("../models/modelsIndex");
const { auth } = require("../autth/auth");

router.get("/:chat", async (req, res) => {
  let { postId } = req.params;
  // console.log("request", req.body);
  let allPosts = await Chat.find({ conntent: postId });

  // res.send(Array.from(allPosts));
  res.send(allPosts);
  //find -Get all user posts
  // res.json(prods_ar);
});
module.exports = router;
