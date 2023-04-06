var express = require("express");
var router = express.Router();

var modelLikesController = require("../controllers/model_likes");

router.post("/create", modelLikesController.createModelLike);

router.delete("/delete", modelLikesController.deleteModelLike);

router.get("/:modelId/getById", modelLikesController.getModelLikes);

module.exports = router;
