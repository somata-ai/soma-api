var createError = require("http-errors");
var express = require("express");
// var session = require("express-session");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
var indexRouter = require("./routes/index");
var dotenv = require("dotenv");
// var passport = require("passport");
// var GoogleStrategy = require("passport-google-oauth20").Strategy;
require("./passport");

var db = require("./config/db.config");

dotenv.config();
var app = express();

// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       callbackURL: "http://localhost:5050/auth/google/callback",
//     },
//     function (accessToken, refreshToken, profile, cb) {
//       console.log("Success");
//       console.log(profile);
//       const user = profile;
//       return cb(null, user);
//     }
//   )
// );

// passport.serializeUser(function (user, done) {
//   done(null, user.emails[0].value);
// });

// passport.deserializeUser(function (emailId, done) {
//   // User.findById(id, function (err, user) {
//   //   done(err, user);
//   // });
//   return done(null, { emailId: emailId });
// });

// app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));
// app.use(passport.initialize());
// app.use(passport.session());

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/auth", indexRouter.auth);
app.use("/comment-likes", indexRouter.commentLikes);
app.use("/comments", indexRouter.comment);
app.use("/group-members", indexRouter.groupMember);
app.use("/groups", indexRouter.group);
app.use("/model-likes", indexRouter.modelLikes);
app.use("/models", indexRouter.model);
app.use("/users", indexRouter.user);

// app.get("/home", (req, res, next) => {
//   console.log(req.user);
//   res.json({
//     userEmail: req.user.emailId,
//   });
// });

// app.get("/logout", function (req, res, next) {
//   req.logout(function (err) {
//     if (err) {
//       return next(err);
//     }
//     res.redirect("/");
//   });
// });

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
