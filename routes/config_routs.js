const indexR = require("./index");
const usersR = require("./users");
const postsR = require("./posts");
const ChatsR = require("./chat");

exports.rotesInit = (app) => {
  app.use("/", indexR);
  app.use("/users", usersR);
  app.use("/posts", postsR);
  app.use("/chat", ChatsR);
  // במקום כל מה שהגדרנו למטה אפשר להגדיר

  // הגדרנו ראוט של העמוד בית
  // req - מה שנקבל מהצד לקוח או הדפדפן בראוט
  // res -במקרה שלנו הדפדפן מה השרת מגיב לצד לקוח
  //   app.get("/", (req, res) => {
  //     // אומר לנו להחזיר מידע בפורמט גייסון לצד לקוח
  //     res.json({ doee: "dkdkdk ", dor: "dddw24444" });
  //   });
};
