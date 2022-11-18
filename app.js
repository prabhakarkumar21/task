require("dotenv").config();
require("./config/database.config").connect();
const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const fileUpload = require("express-fileupload");
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(logger("dev"));
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
    limits: { fileSize: 50 * 1024 * 1024 },
  })
);

app.get("/", (req, res) => {
  res.json({
    message: "Welcome ",
  });
});

const authRoute = require("./routes/auth.route");
const dataRoute = require("./routes/data.route");
app.use("/api/auth", authRoute);
app.use("/api/data", dataRoute);


app.get("/*", (req, res) => {
  res.json({
    message: "Path not found ",
  });
});

module.exports = app;
