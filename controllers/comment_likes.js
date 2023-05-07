const passport = require("passport");
const { body, validationResult } = require("express-validator");
const CommentLike = require("../models/comment_likes");

exports.createCommentLike = [
  passport.authenticate("jwt", { session: false }),
  body("user_id", "User must be provided").trim().isLength({ min: 1 }).escape(),
  body("comment_id", "Comment must be provided")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.json({ errors: errors.array() });
      return;
    }

    const comment_like = {
      user_id: req.body.user_id,
      comment_id: req.body.comment_id,
    };

    CommentLike.create(comment_like, (err, result) => {
      if (err) {
        return next(err);
      }
      res.json({ comment_id: result.comment_id });
    });
  },
];

exports.getCommentLikes = [
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    if (!req.params.commentId) {
      const error = new Error("Please specify id");
      error.status = 400;
      console.log(err);
      return next(err);
    }
    CommentLike.findCommentLikes(req.params.commentId, (err, result) => {
      if (err) {
        return next(err);
      }
      res.json(result);
    });
  },
];

exports.deleteCommentLike = [
  passport.authenticate("jwt", { session: false }),
  body("user_id", "User must be provided").trim().isLength({ min: 1 }).escape(),
  body("comment_id", "Comment must be provided")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.json({ errors: errors.array() });
      return;
    }

    CommentLike.delete(req.body.comment_id, req.body.user_id, (err, result) => {
      if (err) {
        return next(err);
      }
      res.json({ comment_id: result.comment_id });
    });
  },
];
