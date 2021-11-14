// משתנה שלנותן לנו את האפשרויות של האקספרס
const express = require("express");
const session = require("express-session");
let cors = require("cors");
// משתנה בעל יכולת להפעיל שרת
const http = require("http");
const socketIO = require("socket.io");
// חיבור מונגו
const dbConnect = require("./db/mongodbConnect");

// יבוא מהקובץ קונפיג
const { rotesInit } = require("./routes/config_routs");

// משתנה שיש לו את היכולתות של אקספרס והאזנה לראוט
const app = express();

const {
  PORT = 5000,
  NODE_ENV = "development",
  SESS_NAME = "sid",
  SESS_SECRET = "SSS###54%%aa",
  SESS_LIFETIME = 1000 * 60 * 60 * 2,
} = process.env;

const IN_PROUD = NODE_ENV === "production";

// הגדרת פרסור מידע כגייסון
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
    name: SESS_NAME,
    resave: false,
    saveUninitialized: false,
    secret: SESS_SECRET,
    cookie: {
      maxAge: SESS_LIFETIME,
      sameSite: true,
      secure: IN_PROUD,
    },
  })
);

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// מודול שמטפל בניתובים
const path = require("path");

// הגדרת תיקית פבליק כסטטית ניתן לשים בה קבצים ולצד הלקוח יש גישה
app.use(express.static(path.join(__dirname, "public")));

rotesInit(app);

// מייצרים שרת במשתנה אפפ שיש לו את היכולות של אקספרס
const server = http.createServer(app);

// הגדרת פורט
// הפרוסס בודק אם יש איזה פורט עדיף לסביבת העבודה שאני עובהד טסט לדוגמא ואם אין הוא מפעיל על 3000
// let port = process.env.port || "3000";

// האזנה לפםרט

// const io = socketIO(server); ===========

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});
io.on("connection", (socket) => {
  console.log("connection made successfully");
  socket.on("message", (payload) => {
    console.log("Message received on server: ", payload);
    io.emit("message", payload);
  });
});
// let userCount = 1;

// io.on("connection", (socket) => {
//   userCount++;

//   const username = `Guest  ${userCount}`;

//   socket.emit("SET_USERNAME", username);
//   io.sockets.emit("CREATE_MESSAGE", {
//     content: `${username} connected`,
//   });

//   socket.on("SEND_MESSAGE", (messageObject) => {
//     io.sockets.emit("CREATE_MESSAGE", messageObject);
//   });

//   socket.on(`disconnected`, () => {
//     io.sockets.emit(`CREATE_MESSAGE`, {
//       content: `${username} disconnected`,
//     });
//   });
// });

server.listen(PORT);
