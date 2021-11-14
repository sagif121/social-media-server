// const express = require("express");
// const router = express.Router();
// const {
//   models: { Comment },
// } = require("../models/modelsIndex");

// router.get("/", async (req, res) => {
//   console.log("req by get", req.body);
//   let allComments = req.body;
//   let newUser = await new Comment(allComments).save();
//   res.json("user saved successfully");
// });

// router.post("/", async (req, res) => {
//   console.log("req", req.body);
//   let commentDetails = req.body;
//   let newPost = await new Comment(commentDetails).save();
//   res.json("Post saved successfully");
// });

// module.exports = router;
