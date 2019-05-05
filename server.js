//express
const express = require("express");
//require path
const path = require('path');
const app = express();
const dotenv = require("dotenv").config();
const favicon = require('serve-favicon');
const session = require('express-session');
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
//for video recording
const jwt = require("jsonwebtoken");
const cors = require("cors");
//SET UP MONGOOSE
const mongoose = require("mongoose");
const MongoDBStore = require('connect-mongodb-session')(session);

// Port
const port = process.env.PORT || 3000;


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

// Mongoose Connection
const mongoUri =
  process.env.MONGODB_URI || "mongodb://localhost:27017/storys";
mongoose.connect(
  mongoUri,
  {
    useNewUrlParser: true
  }
);

//session store
const store = new MongoDBStore({
  uri: mongoUri,
  collection: 'sessions'
});

// static files middleware
app.use('/public', express.static(path.join(__dirname, 'public')))
app.use(
  session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: false,
    store: store
  })
);

//user session
app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

// require('./models/User');
// require('./models/Book');
// app.use(require('./controllers'));


const booksController = require("./controllers/books");
app.use(booksController);

const usersController = require("./controllers/users");
app.use(usersController);

//index page
app.get("/", (req, res) => {
    res.render("index");
});

//404 page
app.get("*", (req, res) => {
    res.render("error");
});

//port
app.listen(port, () => {
  console.log("listening on 3000");
});

module.exports = app;