const express = require("express");
const session = require("express-session");
const router = express.Router();
const { Post, User } = require("../models/modelsIndex");
const { auth } = require("../autth/auth");

router.get("/", async (req, res) => {
  let allPosts = await Post.find({});

  res.send(allPosts);
});

//Get specific post
router.get("/:postId", async (req, res) => {
  let { postId } = req.params;

  let allPosts = await Post.find({ _id: postId });

  res.send(allPosts);
});

router.post("/newPost", auth, async (req, res) => {
  let user = await User.findOne({ email: req.session.email });
  console.log(user);

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
  let postToEdit = req.params.postToEdit;

  let updatedPost = await Post.findOneAndUpdate({ _id: postToEdit }, req.body);

  res.json(updatedPost);
});

router.put("/newComment/:postToEdit", async (req, res) => {
  let postToEdit = req.params.postToEdit;

  let getPost = await Post.find({ _id: postToEdit });
  let postBefore = getPost[0];

  postBefore.comments.push(req.body.comments[0]);

  let updatedPost = await Post.findOneAndUpdate(
    { _id: postToEdit },
    postBefore,
    { omitUndefined: true }
  );

  res.json(updatedPost);
});
router.put("/newLike/:postToEdit", async (req, res) => {
  let userAlreadyLikeThisPost = false;

  let postToEdit = req.params.postToEdit;
  let likedBy = req.body;

  let getPost = await Post.find({ _id: postToEdit });
  let postBefore = getPost[0];

  for (let index = 0; index < postBefore.likes.length; index++) {
    const like = postBefore.likes[index];

    if (like.likedBy.toString() === likedBy.likedBy) {
      userAlreadyLikeThisPost = true;
    }
  }

  if (userAlreadyLikeThisPost) {
    res.send({ message: "Already liked" });
  } else if (!userAlreadyLikeThisPost) {
    postBefore.likes.push(likedBy);
    let updatedPost = await Post.findOneAndUpdate(
      { _id: postToEdit },
      postBefore,
      { omitUndefined: true }
    );
    let yaAllah = await Post.find({ _id: postToEdit });

    res.send({ message: "like saved" });
  } else {
    console.log("cant do that");
  }
});

router.delete("/:postId", async (req, res) => {
  let { postId } = req.params;

  let allPosts = await Post.findOneAndRemove({ _id: postId });

  res.send(allPosts);
});

router.put("/:id/like", async (req, res) => {
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
