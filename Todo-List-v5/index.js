if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();

const path = require("path");
const mongoose = require("mongoose");
const todoRoutes = require("./routes/todo");
const methodOverride = require("method-override");
const session = require("express-session");
const flash = require("connect-flash");
const authRoutes = require("./routes/auth");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user");
const mongoSanitize = require("express-mongo-sanitize");
const MongoStore = require("connect-mongo");
const secret = process.env.SECRET || "weneedsomebettersecret";
const dbUrl = process.env.dbUrl || "mongodb://localhost:27017/todo";

mongoose
  .connect(dbUrl)
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log(err));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(mongoSanitize());

const store = MongoStore.create({
  secret: secret,
  mongoUrl: dbUrl,
  touchAfter: 24 * 60 * 60,
});

const sessionConfig = {
  store,
  secret: secret,
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7 * 1,
    maxAge: 1000 * 60 * 60 * 24 * 7 * 1,
  },
};

app.get("/", (req, res) => {
  res.render("home");
});
app.use(session(sessionConfig));

// Initialising middleware for passport
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Telling the passport to check for username and password using authenticate method provided by the passport-local-mongoose package
passport.use(new LocalStrategy(User.authenticate()));
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

app.use(todoRoutes);
app.use(authRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server running at port ${port}`);
});
