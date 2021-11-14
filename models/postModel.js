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

// exports.UserModel = UserModel;

// exports.genToken = (_userId) => {
//   let token = jwt.sign({ _id: _userId }, "SAGIPASS", { expiresIn: "60days" });
//   return token;
// };

// exports.validUsers = (_bodyData) => {
//   let joiSchema = joi.object({
//     userName: joi.string().min(2).max(99).required(),
//     email: joi.string().min(10).max(300).required().email(),
//     password: joi.string().min(2).max(200).required(),
//     nickName: joi.string().min(2).max(300),
//   });

//   return joiSchema.validate(_bodyData);
// };

// exports.validLogin = (_bodyData) => {
//   let joiSchema = joi.object({
//     email: joi.string().min(10).max(300).required().email(),
//     password: joi.string().min(2).max(200).required(),
//   });

//   return joiSchema.validate(_bodyData);
// };
