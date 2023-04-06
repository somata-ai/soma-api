const { connection } = require("../config/db.config");

class CommentLikes {
  static create(newCommentLike, callback) {
    connection.query(
      "INSERT INTO Comment_Likes Set ?",
      newCommentLike,
      (err, result) => {
        if (err) {
          callback(err, null);
          return;
        } else {
          console.log("Created comment like with id: ", result.insertId);
          callback(null, { ...newCommentLike });
        }
      }
    );
  }

  static findCommentLikes(commentId, callback) {
    connection.query(
      "SELECT * FROM Comment_Likes WHERE Comment_Likes.comment_id = ?",
      [commentId],
      (err, result) => {
        if (err) {
          callback(err, null);
          return;
        }
        callback(null, result);
      }
    );
  }

  static delete(commentId, userId, callback) {
    connection.query(
      "DELETE FROM Comment_Likes WHERE comment_id = ? AND user_id = ?",
      [commentId, userId],
      (err, result) => {
        if (err) {
          callback(err, null);
          return;
        }
        console.log(
          `Deleted comment like with user id: ${userId} and comment id ${commentId}`
        );
        callback(null, { comment_id: commentId, user_id: userId });
      }
    );
  }
}

module.exports = CommentLikes;
