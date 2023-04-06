const { body, validationResult } = require("express-validator");
const Group = require("../models/group");

exports.createGroup = [
  body("name", "Username must be provided")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.json({ errors: errors.array() });
      return;
    }

    const group = {
      name: req.body.name || null,
      description: req.body.description || null,
    };

    Group.create(group, (err, result) => {
      if (err) {
        return next(err);
      }
      res.json({ group_id: result.group_id });
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
  Group.findByName(req.params.name, (err, result) => {
    if (err) {
      return next(err);
    }
    res.json(result);
  });
};

exports.getById = (req, res, next) => {
  if (!req.params.groupId) {
    const error = new Error("Please specify id");
    error.status = 400;
    console.log(err);
    return next(err);
  }
  User.findById(req.params.groupId, (err, result) => {
    if (err) {
      return next(err);
    }
    res.json(result);
  });
};

exports.updateGroup = [
  body("group_id", "Group id must be provided")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.json({ errors: errors.array() });
      return;
    }

    Group.findById(req.body.group_id, (err, result) => {
      if (err) {
        return next(err);
      }
      result = result[0];
      const updatedGroup = {
        name: req.body.name || result.name,
        description: req.body.description || result.description,
      };

      Group.update(req.body.group_id, updatedGroup, (err, result) => {
        if (err) {
          return next(err);
        }
        res.json({ group_id: result.group_id });
      });
    });
  },
];

exports.deleteGroup = (req, res, next) => {
  Group.delete(req.params.groupId, (err, result) => {
    if (err) {
      return next(err);
    }
    res.json({ group_id: result.group_id });
  });
};
