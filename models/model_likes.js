class ModelLikes {
  static create(newModelLike, callback) {
    connection.query(
      "INSERT INTO Model_Likes Set ?",
      newModelLike,
      (err, result) => {
        if (err) {
          callback(err, null);
          return;
        } else {
          console.log("Created model like with id: ", result.insertId);
          callback(null, { ...newModelLike });
        }
      }
    );
  }

  static findModelLikes(modelId, callback) {
    connection.query(
      "SELECT * FROM Model_Likes WHERE Model_Likes.model_id = ?",
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

  static delete(modelId, userId, callback) {
    connection.query(
      "DELETE FROM Model_Likes WHERE model_id = ? AND user_id = ?",
      [modelId, userId],
      (err, result) => {
        if (err) {
          callback(err, null);
          return;
        }
        console.log(
          `Deleted model like with user id: ${userId} and model id ${modelId}`
        );
        callback(null, { model_id: modelId, user_id: userId });
      }
    );
  }
}

module.exports = ModelLikes;
