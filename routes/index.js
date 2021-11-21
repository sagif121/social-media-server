const express = require("express");
const router = express.Router();
const User = require("./users");
const Post = require("./posts");
const chat = require("./chat");

router.get("/", (req, res) => {
  res.json({ msg: "עובד" });
});

module.exports = router;
