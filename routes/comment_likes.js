var express = require("express");
var router = express.Router();

var commentLikesController = require("../controllers/comment_likes");

router.post("/create", commentLikesController.createCommentLike);

router.delete("/delete", commentLikesController.deleteCommentLike);

router.get("/:commentId/getById", commentLikesController.getCommentLikes);

module.exports = router;
