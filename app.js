const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const errorMiddleware = require("./middleware/Error");

// Config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "./config/config.env" });
}

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Setting  EJS as templating engine
app.set("view engine", "ejs");

// Route Imports
const user = require("./routes/user.routes");
const creator = require("./routes/creator.routes");


// actual routes
app.use("/api/v1", user);
app.use("/api/v1", creator);

app.get("*", (req, res) => {
  // res.send("connected");
  res.render("index.ejs");
});

// Middleware for Errors
app.use(errorMiddleware);

module.exports = app;
