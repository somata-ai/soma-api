const jwt = require("jsonwebtoken");
const passport = require("passport");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");
const User = require("../models/user");

exports.createUserByPassword = [
  body("username", "Username must be provided")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("password", "Password must be provided")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const err = new Error("Invalid input");
      err.status = 400;
      return next(err);
    }

    //Check if a user already exists.
    User.findByName(req.body.username, function (err, result) {
      if (err) {
        return next(err);
      }
      if (result.length > 0) {
        console.log(result.length);
        res.json({
          message: "User exists",
        });
      } else {
        //Create a user. Encrypt too.
        bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
          if (err) {
            return next(err);
          } else {
            const user = {
              username: req.body.username,
              password: hashedPassword,
              email: req.body.email || null,
              bio: req.body.bio || null,
              profile_picture_url: req.body.profile_pic_url || null,
            };
            User.create(user, (err, result) => {
              if (err) {
                return next(err);
              }
              passport.authenticate(
                "local",
                { session: false },
                (err, user, info) => {
                  if (err || !user) {
                    return res.status(400).json({
                      message: "Authentication Err. Something is not right.",
                      user: user,
                    });
                  }
                  req.login(user, { session: false }, (err) => {
                    if (err) {
                      return res.send(err);
                    }
                    //If user is coming from mongoose use user.toJSON.
                    //Else use JSON.stringify(user).
                    //The object to generate token should be a json object.
                    const token = jwt.sign(JSON.stringify(user), "secret-key");
                    return res.json({ user: token, id: user.user_id });
                  });
                }
              )(req, res);
              // res.json({ user_id: result.user_id });
            });
          }
        });
      }
    });
  },
];

// exports.createUser = [
//   body("username", "Username must be provided")
//     .trim()
//     .isLength({ min: 1 })
//     .escape(),

//   (req, res, next) => {
//     const errors = validationResult(req);

//     if (!errors.isEmpty()) {
//       res.json({ errors: errors.array() });
//       return;
//     }

//     const user = {
//       username: req.body.username,
//       password: req.body.password || null,
//       email: req.body.email || null,
//       bio: req.body.bio || null,
//       profile_picture_url: req.body.profile_picture_url || null,
//       wallpaper_url: req.body.wallpaper_url || null,
//     };

//     User.create(user, (err, result) => {
//       if (err) {
//         return next(err);
//       }
//       res.json({ user_id: result.user_id });
//     });
//   },
// ];

exports.getByName = [
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    if (!req.params.name) {
      const error = new Error("Please specify name");
      error.status = 400;
      console.log(err);
      return next(err);
    }
    User.findByName(req.params.name, (err, result) => {
      if (err) {
        return next(err);
      }
      res.json(result);
    });
  },
];

exports.getById = [
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    if (!req.params.userId) {
      const error = new Error("Please specify id");
      error.status = 400;
      console.log(err);
      return next(err);
    }
    User.findById(req.params.userId, (err, result) => {
      if (err) {
        return next(err);
      }
      res.json(result);
    });
  },
];

exports.updateUser = [
  passport.authenticate("jwt", { session: false }),
  body("user_id", "User id must be provided")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json({ errors: errors.array() });
      return;
    }

    User.findById(req.body.user_id, (err, result) => {
      if (err) {
        return next(err);
      }
      result = result[0];
      const updatedUser = {
        email: req.body.email || result.email,
        bio: req.body.bio || result.bio,
        profile_pic_url: req.body.profile_pic_url || result.profile_pic_url,
        linkedin_url: req.body.linkedin_url || result.linkedin_url,
        company: req.body.company || result.company,
        country: req.body.country || result.country,
      };
      User.update(req.body.user_id, updatedUser, (err, result) => {
        if (err) {
          return next(err);
        }
        res.json({ user_id: result.user_id });
      });
    });
  },
];

exports.deleteUser = [
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    User.delete(req.params.userId, (err, result) => {
      if (err) {
        return next(err);
      }
      res.json({ user_id: result.user_id });
    });
  },
];

exports.loginUser = [
  body("username").trim().escape(),
  body("password").trim().escape(),
  (req, res, next) => {
    passport.authenticate("local", { session: false }, (err, user, info) => {
      if (err || !user) {
        return res.status(400).json({
          message: "Authentication Err. Something is not right.",
          user: user,
        });
      }
      req.login(user, { session: false }, (err) => {
        if (err) {
          return res.send(err);
        }
        //If user is coming from mongoose use user.toJSON.
        //Else use JSON.stringify(user).
        //The object to generate token should be a json object.
        const token = jwt.sign(JSON.stringify(user), "secret-key");
        return res.json({ user: token, id: user.user_id });
      });
    })(req, res);
  },
];
