const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const session = require("express-session");
const { auth } = require("../autth/auth");

const { User } = require("../models/modelsIndex");
const jwt = require("jsonwebtoken");

router.post("/login", async (req, res) => {
  let user = await User.findOne({ email: req.body.email });

  if (!user) {
    return res.status(217).send("User Already exists");
  }
  let userPassword = user.password;

  if (userPassword === req.body.password) {
    req.session.cookie;
    req.session.email = req.body.email;
    req.session.password = req.body.password;

    res.status(200).send(user);
    return;
  } else {
    res.status(212).send("Email or password are incorrect");
    return;
  }
});

router.post("/logout", async (req, res) => {
  let user = await User.findOne({ email: req.session.email });
  if (!user) {
    return res.send("not user Login");
  }
  req.session.destroy();
  res.send("user logout");
});

router.get("/", async (req, res) => {
  let user = await User.findOne({ email: req.session.email }).select(
    "-password"
  );
  if (req.session.email) {
    return res.send(user);
  } else {
    res.json(null);
  }
});

router.post("/newUser", async (req, res) => {
  let userNew = req.body;

  let ifEmailExist = await User.findOne({ email: req.body.email });

  if (ifEmailExist) {
    res.status(400).json("Email already exists");
    return;
  } else {
    let newUser = await new User(userNew).save();
    res.json("user saved successfully");
  }
});

router.put("/:userId", async (req, res) => {
  let userToEdit = req.params.userId;
  let updateDetails = req.body;

  let updatedUser = await User.findOneAndUpdate(
    { _id: userToEdit },
    updateDetails,
    { omitUndefined: true }
  );

  res.send(updatedUser);
});

module.exports = router;
