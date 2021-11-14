const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const session = require("express-session");
const { auth } = require("../autth/auth");
// const {
//   UserModel,
//   validUsers,
//   validLogin,
//   genToken,
// } = require("../models/userModel");
// const { authToken } = require("../autth/authToken");

const { User } = require("../models/modelsIndex");
const jwt = require("jsonwebtoken");

router.post("/login", async (req, res) => {
  console.log("try ro login");
  console.log("req", req.body);

  let user = await User.findOne({ email: req.body.email });
  console.log("user", user);

  if (!user) {
    return res.status(401).send("email or password incurect");
  }
  let userPassword = user.password;

  if (userPassword === req.body.password) {
    req.session.cookie;
    req.session.email = req.body.email;
    req.session.password = req.body.password;
    // console.log(req.session.email);
    res.status(200).send(user);
    return;
  }
  // res.send("email or password incurect");
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
  console.log("req", req.body);
  let userNew = req.body;
  let newUser = await new User(userNew).save();
  res.json("user saved successfully");
});

router.put("/:userId", async (req, res) => {
  let userToEdit = req.params.userId;
  let updateDetails = req.body;
  console.log("req params", userToEdit);
  console.log("body", req.body);
  let updatedUser = await User.findOneAndUpdate(
    { _id: userToEdit },
    updateDetails,
    { omitUndefined: true }
  );
  // let userNew = req.body;
  // let newUser = await new User(userNew).save();
  // res.json("user saved successfully");
  res.send(updatedUser);
});

// router.get("/", async (req, res) => {
//   let data = await UserModel.find({});
//   let filteredData = data.map((user) => {
//     user.password = 0;
//   });
//   //find /find one
//   res.json(data);
// });

// router.get("/userInfo", async (req, res) => {
//get userInfo
// add body to request
//front
//save user._id!!!!!!!!!!! as item in local storage.
//window.localStorage.getItem('userDetails',{}).
// let user = await UserModel.findOne({ userName: "mom" });
// console.log("user details", user);
// let user = await UserModel.findOne({ _id: req.tokenData._id });
// res.json(user);
// let token = req.header("x-api-key");
// if (!token) {
//   res.status(401).json({ msg: "you must send token" });
// }
// try {
//   let decodeToken = jwt.verify(token, "SAGIPASS");
//   let user = await UserModel.findOne(
//     { _id: decodeToken._id },
//     { password: 0 }
//   );
//   res.json(user);
// } catch (err) {
//   res.status(401).json({ msg: "token invalid or expired" });
// }
// });
// בקשת פוסט
// router.post("/", async (req, res) => {
//   res.json({
//     userName: req.body.userName,
//     email: req.body.email,
//   });
// });

// אפשר לעשות בקשה גם לכל הבדי
// router.post("/", async (req, res) => {

//   res.json(req.body);
// });

// router.post("/", async (req, res) => {
//   let validBody = validUsers(req.body);
//   if (validBody.error) {
//     return res.status(400).json(validBody.error.details);
//   }

//   try {
//     let user = new UserModel(req.body);
//     user.password = await bcrypt.hash(user.password, 10);
//     await user.save();
//     user.password = "****";
//     res.json(user);
//   } catch (err) {
//     console.log(err);
//     res.status(400).json({ err: "email is exists" });
//   }
// });

// router.delete("/:idDel", async (req, res) => {
//   try {
//     let data = await UserModel.deleteOne({ _id: req.params.idDel });

//     res.json(data);
//   } catch (err) {
//     console.log(err);
//     res.status(400).send(err);
//   }
// });

// router.put("/:idEdit", async (req, res) => {
//   let validBody = validUsers(req.body);
//   if (validBody.error) {
//     return res.status(400).json(validBody.error.details);
//   }
//   try {
//     let data = await UserModel.updateOne({ _id: req.params.idEdit }, req.body);
//     res.json(data);
//   } catch (err) {
//     console.log(err);
//     res.status(400).send(err);
//   }
// });

// router.get("/", async (req, res) => {
//   let data = await userModel.findOne({ userName: "name2" });
//   //find /find one

//   res.json(data);
// });

// router.post("/signUp", (req, res) => {
//   //Save New User
// });

// router.post("/login", async (req, res) => {
//   let validBody = validLogin(req.body);
//   if (validBody.error) {
//     return res.status(400).json(validBody.error.details);
//   }

//   let user = await UserModel.findOne({ email: req.body.email });
//   if (!user) {
//     return res.status(401).json({ msg: "User not found" });
//   }
//   let passValid = await bcrypt.compare(req.body.password, user.password);
//   if (!passValid) {
//     return res.status(401).json({ msg: "Password worng" });
//   }

//   let newToken = genToken(user.id);
//   res.json({ token: newToken });
// });

module.exports = router;
