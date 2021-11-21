const mongoose = require("mongoose");
mongoose.connect(`mongodb://localhost:27017/myproject`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {});

module.exports = db;
