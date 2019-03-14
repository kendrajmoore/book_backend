//express
const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const favicon = require('serve-favicon');
//require handlebars
const hbs = require("express-handlebars");
//body-parser
const bodyParser = require("body-parser");
//logger
const morgan = require("morgan");
//cookier-parser
const cookieParser = require("cookie-parser");
//delete, edit
const methodOverride = require("method-override");
const jwt = require("jsonwebtoken");
const cors = require("cors");

//require path
const path = require('path');


// Port
const port = process.env.PORT || 3000;


//SET UP MONGOOSE
const mongoose = require("mongoose");


//require express handlebars
// Set the view engine and file extension
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.engine("hbs", hbs({ defaultLayout: "main", extname: "hbs" }));
app.set("view engine", "hbs");

//middleware
app.use(methodOverride("_method"));
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());
app.use(cookieParser());
app.use(morgan("dev"));

app.use(cors());


// static files middleware
app.use('/public', express.static(path.join(__dirname, 'public')))

// Mongoose Connection
const mongoUri =
  process.env.MONGODB_URI || "mongodb://localhost:27017/storys";
mongoose.connect(
  mongoUri,
  {
    useNewUrlParser: true
  }
);

//USER AUTH
var checkAuth = (req, res, next) => {
  if (
      typeof req.cookies.nToken === "undefined" ||
      req.cookies.nToken === null
  ) {
      req.user = null;
  } else {
      var token = req.cookies.nToken;
      var decodedToken = jwt.decode(token, { complete: true }) || {};
      req.user = decodedToken.payload;
  }

  next();
};
app.use(checkAuth);

const usersController = require("./controllers/users");
app.use(usersController);

//index page
app.get("/", (req, res) => {
    res.send("bruh");
});

//404 page
app.get("*", (req, res) => {
    res.send("no");
});

//port
app.listen(port, () => {
  console.log("listening on 3000");
});

module.exports = app;