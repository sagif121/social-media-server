const express = require("express");
const session = require("express-session");
const router = express.Router();
const { Post, User } = require("../models/modelsIndex");
const { auth } = require("../autth/auth");

router.get("/", async (req, res) => {
  // console.log("request", req.body);
  let allPosts = await Post.find({});

  // res.send(Array.from(allPosts));
  res.send(allPosts);
  //find -Get all user posts
  // res.json(prods_ar);
});

//Get specific post
router.get("/:postId", async (req, res) => {
  let { postId } = req.params;
  // console.log("request", req.body);
  let allPosts = await Post.find({ _id: postId });

  // res.send(Array.from(allPosts));
  res.send(allPosts);
  //find -Get all user posts
  // res.json(prods_ar);
});

router.post("/newPost", auth, async (req, res) => {
  let user = await User.findOne({ email: req.session.email });
  console.log(user);
  // console.log(req.session);
  // let postDetails = req.body;
  let newPost = await new Post({
    ...req.body,
    userId: user._id.toString(),
    createdBy: user.firstName,
    dateCreated: Date.now(),
    dateUpdated: Date.now(),
  });
  newPost.save();
  res.send("Post saved successfully");
});

router.put("/:postToEdit", auth, async (req, res) => {
  console.log("try to put");
  console.log("try to put", req.params.postToEdit);
  let postToEdit = req.params.postToEdit;
  console.log(postToEdit);
  // let updateDetails = req.body;
  // let postBefore = await Post.find({ _id: postToEdit });

  let updatedPost = await Post.findOneAndUpdate(
    { _id: postToEdit },
    req.body
    // { omitUndefined: true }
  );
  // let postAfterUpdate = await Post.findOne({ _id: postToEdit });

  res.json(updatedPost);
});

router.put("/newComment/:postToEdit", async (req, res) => {
  console.log("try to put", req.params.postToEdit);
  let postToEdit = req.params.postToEdit;
  // let updateDetails = req.body;

  let getPost = await Post.find({ _id: postToEdit });
  let postBefore = getPost[0];
  // console.log("req.body", req.body);
  console.log("The comment", req.body.comments[0]);
  postBefore.comments.push(req.body.comments[0]);
  // console.log("postBefore", postBefore);

  let updatedPost = await Post.findOneAndUpdate(
    { _id: postToEdit },
    postBefore,
    { omitUndefined: true }
  );
  // console.log("updates", updatedPost);
  // let postAfterUpdate = await Post.findOne({ _id: postToEdit });

  res.json(updatedPost);
});
router.put("/newLike/:postToEdit", async (req, res) => {
  let userAlreadyLikeThisPost = false;
  console.log("try to put by likes", req.params.postToEdit);
  let postToEdit = req.params.postToEdit;
  let likedBy = req.body;
  console.log("post to edit", postToEdit, "user id", likedBy);
  let getPost = await Post.find({ _id: postToEdit });
  let postBefore = getPost[0];
  console.log("postBefore For", postBefore.likes);
  for (let index = 0; index < postBefore.likes.length; index++) {
    const like = postBefore.likes[index];
    // console.log("like", like);
    // console.log("like.likedBy", like.likedBy, "liked from front", likedBy);
    if (like.likedBy.toString() === likedBy.likedBy) {
      console.log("Already liked by you ");
      userAlreadyLikeThisPost = true;
    }
  }

  if (userAlreadyLikeThisPost) {
    console.log("Already liked ,TRY ANOTHER TIME");
    res.send({ message: "Already liked" });
  } else if (!userAlreadyLikeThisPost) {
    postBefore.likes.push(likedBy);
    let updatedPost = await Post.findOneAndUpdate(
      { _id: postToEdit },
      postBefore,
      { omitUndefined: true }
    );
    let yaAllah = await Post.find({ _id: postToEdit });
    // console.log("postBefore", postBefore);
    console.log("updated with likes", yaAllah);
    res.send({ message: "like saved" });

    // res.send(" liked successfully");
  } else {
    console.log("cant do that");
  }

  // console.log("updates", updatedPost);
  // let postAfterUpdate = await Post.findOne({ _id: postToEdit });

  // res.json(updatedPost);
});

router.delete("/:postId", async (req, res) => {
  let { postId } = req.params;

  let allPosts = await Post.findOneAndRemove({ _id: postId });

  res.send(allPosts);
});

router.put("/:id/like", async (req, res) => {
  // let user = await User.findOne({ email: req.session.email });
  let post = await Post.findOne({ _id: req.params.id });

  try {
    if (!post.likes.includes(user._id)) {
      await post.updateOne({ $push: { likes: user._id } });
      res.status(200).send("the post has liked");
    } else {
      await post.updateOne({ $pull: { likes: user._id } });
      res.status(200).send("The post has been unLike");
    }
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
