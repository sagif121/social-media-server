const indexR = require("./index");
const usersR = require("./users");
const postsR = require("./posts");
const ChatsR = require("./chat");

exports.rotesInit = (app) => {
  app.use("/", indexR);
  app.use("/users", usersR);
  app.use("/posts", postsR);
  app.use("/chat", ChatsR);
};
