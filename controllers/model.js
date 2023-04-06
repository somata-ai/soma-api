const { body, validationResult } = require("express-validator");
const Model = require("../models/model");

exports.createModel = [
  body("name", "Name must be provided").trim().isLength({ min: 1 }).escape(),
  body("learning_rate", "Learning rate must be provided")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("optimizer", "Optimizer must be provided")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("layers", "Layers must be provided")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.json({ errors: errors.array() });
      return;
    }

    if (!req.body.user_id && !req.body.group_id) {
      const error = new Error("Please specify user or group");
      error.status = 400;
      console.log(err);
      return next(err);
    }

    const model = {
      name: req.body.name,
      weights: req.body.weights || null,
      user_id: req.body.user_id || null,
      group_id: req.body.group_id || null,
      learning_rate: req.body.learning_rate,
      optimizer: req.body.optimizer,
      layers: req.body.layers,
    };

    Model.create(model, (err, result) => {
      if (err) {
        return next(err);
      }
      res.json({ model_id: result.model_id });
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
  Model.findByName(req.params.name, (err, result) => {
    if (err) {
      return next(err);
    }
    res.json(result);
  });
};

exports.getById = (req, res, next) => {
  if (!req.params.modelId) {
    const error = new Error("Please specify id");
    error.status = 400;
    console.log(err);
    return next(err);
  }
  Model.findById(req.params.modelId, (err, result) => {
    if (err) {
      return next(err);
    }
    res.json(result);
  });
};

exports.getUserModels = (req, res, next) => {
  if (!req.params.userId) {
    const error = new Error("Please specify id");
    error.status = 400;
    console.log(err);
    return next(err);
  }
  Model.findUserModels(req.params.userId, (err, result) => {
    if (err) {
      return next(err);
    }
    res.json(result);
  });
};

exports.updateModel = [
  body("model_id", "Model id must be provided")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  (req, res, next) => {
    if (!errors.isEmpty()) {
      res.json({ errors: errors.array() });
      return;
    }

    Model.findById(req.body.model_id, (err, result) => {
      if (err) {
        return next(err);
      }

      const updatedModel = {
        name: req.body.name || result.name,
        weights: req.body.weights || result.weights,
        user_id: req.body.user_id,
        group_id: req.body.group_id,
        learning_rate: req.body.learning_rate || result.learning_rate,
        optimizer: req.body.optimizer || result.optimizer,
        layers: req.body.layers || result.layers,
      };

      Model.update(req.body.model_id, updatedModel, (err, result) => {
        if (err) {
          return next(err);
        }
        res.json({ model_id: result.model_id });
      });
    });
  },
];

exports.deleteModel = (req, res, next) => {
  Model.delete(req.params.modelId, (err, result) => {
    if (err) {
      return next(err);
    }
    res.json({ model_id: result.model_id });
  });
};
