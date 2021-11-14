// const jwt = require("jsonwebtoken");

// exports.authToken = (req, res, next) => {
//   let token = req.header("x-api-key");
//   if (!token) {
//     res.status(401).json({ msg: "you must send token" });
//   }
//   try {
//     let decodeToken = jwt.verify(token, "SAGIPASS");
//     req.tokenData = decodeToken;

//     next();
//   } catch (err) {
//     res.status(401).json({ msg: "token invalid or expired" });
//   }
// };
