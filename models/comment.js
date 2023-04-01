class Comment {
  static create(newComment, callback) {
    connection.query("INSERT INTO Comment Set ?", newComment, (err, result) => {
      if (err) {
        callback(err, null);
        return;
      } else {
        console.log("Created comment with id: ", result.insertId);
        callback(null, { comment_id: result.insertId, ...newComment });
      }
    });
  }

  static findModelComments(modelId, callback) {
    connection.query(
      "SELECT * FROM Comment WHERE Comment.model_id = ?",
      [modelId],
      (err, result) => {
        if (err) {
          callback(err, null);
          return;
        }
        callback(null, result);
      }
    );
  }

  static delete(commentId, callback) {
    connection.query(
      "DELETE FROM Comment WHERE comment_id = ?",
      [commentId],
      (err, result) => {
        if (err) {
          callback(err, null);
          return;
        }
        console.log("Deleted comment with id: ", commentId);
        callback(null, { comment_id: commentId });
      }
    );
  }
}

module.exports = Comment;
