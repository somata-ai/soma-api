const passport = require("passport");
const { body, validationResult } = require("express-validator");
const GroupMember = require("../models/group_member");

exports.createGroupMember = [
  passport.authenticate("jwt", { session: false }),
  body("group_id", "Group must be provided")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("user_id", "User must be provided").trim().isLength({ min: 1 }).escape(),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.json({ errors: errors.array() });
      return;
    }

    const groupMember = {
      group_id: req.body.group_id,
      user_id: req.body.user_id,
    };

    Group.create(group, (err, result) => {
      if (err) {
        return next(err);
      }
      res.json({ group_id: result.group_id });
    });
  },
];

exports.deleteGroupMember = [
  passport.authenticate("jwt", { session: false }),
  body("group_id", "Group must be provided")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("user_id", "User must be provided").trim().isLength({ min: 1 }).escape(),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.json({ errors: errors.array() });
      return;
    }

    GroupMember.delete(req.body.group_id, req.body.user_id, (err, result) => {
      if (err) {
        return next(err);
      }
      res.json({ group_id: result.group_id });
    });
  },
];
