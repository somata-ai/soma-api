const { body, validationResult } = require("express-validator");
const Comment = require("../models/comment");

exports.createComment = [
  body("text", "Text must be provided").trim().isLength({ min: 1 }).escape(),
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

    const comment = {
      text: req.body.name,
      user_id: req.body.weights,
      model_id: req.body.user_id,
    };

    Comment.create(comment, (err, result) => {
      if (err) {
        return next(err);
      }
      res.json({ comment_id: result.comment_id });
    });
  },
];

exports.getModelComments = (req, res, next) => {
  if (!req.params.modelId) {
    const error = new Error("Please specify id");
    error.status = 400;
    console.log(err);
    return next(err);
  }
  Comment.findModelComments(req.params.modelId, (err, result) => {
    if (err) {
      return next(err);
    }
    res.json(result);
  });
};

exports.deleteComment = (req, res, next) => {
  Model.delete(req.params.commentId, (err, result) => {
    if (err) {
      return next(err);
    }
    res.json({ comment_id: result.comment_id });
  });
};
