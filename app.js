const express = require("express");
const session = require("express-session");
let cors = require("cors");

const http = require("http");
const socketIO = require("socket.io");

const dbConnect = require("./db/mongodbConnect");

const { rotesInit } = require("./routes/config_routs");

const app = express();

const {
  PORT = 5000,
  NODE_ENV = "development",
  SESS_NAME = "sid",
  SESS_SECRET = "SSS###54%%aa",
  SESS_LIFETIME = 1000 * 60 * 60 * 2,
} = process.env;

const IN_PROUD = NODE_ENV === "production";

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

const path = require("path");

app.use(express.static(path.join(__dirname, "public")));

rotesInit(app);

const server = http.createServer(app);

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});
io.on("connection", (socket) => {
  socket.on("message", (payload) => {
    io.emit("message", payload);
  });
});

server.listen(PORT);
