var express = require("express");
var router = express.Router();

var commentController = require("../controllers/comment");

router.post("/create", commentController.createComment);

router.delete("/delete", commentController.deleteComment);

router.get("/:modelId/getById", commentController.getModelComments);

module.exports = router;
