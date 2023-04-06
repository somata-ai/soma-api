const { body, validationResult } = require("express-validator");
const User = require("../models/user");

exports.createUser = [
  body("username", "Username must be provided")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.json({ errors: errors.array() });
      return;
    }

    const user = {
      username: req.body.username,
      password: req.body.password || null,
      email: req.body.email || null,
      bio: req.body.bio || null,
      profile_picture_url: req.body.profile_picture_url || null,
      wallpaper_url: req.body.wallpaper_url || null,
    };

    User.create(user, (err, result) => {
      if (err) {
        return next(err);
      }
      res.json({ user_id: result.user_id });
    });
  },
];

exports.getByName = (req, res, next) => {
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
};

exports.getById = (req, res, next) => {
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
};

exports.updateUser = [
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

      const updatedUser = {
        username: req.body.username || result.username,
        password: req.body.password || result.password,
        email: req.body.email || result.email,
        bio: req.body.bio || result.bio,
        profile_pic_url: req.body.password || result.profile_pic_url,
        wallpaper_url: req.body.wallpaper_url || result.wallpaper_url,
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

exports.deleteUser = (req, res, next) => {
  User.delete(req.params.userId, (err, result) => {
    if (err) {
      return next(err);
    }
    res.json({ user_id: result.user_id });
  });
};
