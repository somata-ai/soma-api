const passport = require("passport");
const { body, validationResult } = require("express-validator");
const ModelLike = require("../models/model_likes");

exports.createModelLike = [
  passport.authenticate("jwt", { session: false }),
  body("user_id", "User must be provided").trim().isLength({ min: 1 }).escape(),
  body("model_id", "Model must be provided")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.json({ errors: errors.array() });
      return;
    }

    const model_like = {
      user_id: req.body.user_id,
      model_id: req.body.model_id,
    };

    ModelLike.create(model_like, (err, result) => {
      if (err) {
        return next(err);
      }
      res.json({ model_id: result.model_id });
    });
  },
];

exports.getModelLikes = [
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    if (!req.params.modelId) {
      const error = new Error("Please specify id");
      error.status = 400;
      console.log(err);
      return next(err);
    }
    ModelLike.findModelLikes(req.params.modelId, (err, result) => {
      if (err) {
        return next(err);
      }
      res.json(result);
    });
  },
];

exports.getLikesByUser = [
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    if (!req.params.userId) {
      const error = new Error("Please specify id");
      error.status = 400;
      console.log(err);
      return next(err);
    }
    ModelLike.findLikesByUser(req.params.userId, (err, result) => {
      if (err) {
        return next(err);
      }
      res.json(result);
    });
  },
];

exports.deleteModelLike = [
  passport.authenticate("jwt", { session: false }),
  body("user_id", "User must be provided").trim().isLength({ min: 1 }).escape(),
  body("model_id", "Model must be provided")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.json({ errors: errors.array() });
      return;
    }

    ModelLike.delete(req.body.model_id, req.body.user_id, (err, result) => {
      if (err) {
        return next(err);
      }
      res.json({ model_id: result.model_id });
    });
  },
];
