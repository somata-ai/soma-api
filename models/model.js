const { connection } = require("../config/db.config");

class Model {
  static create(newModel, callback) {
    connection.query("INSERT INTO Model Set ?", newModel, (err, result) => {
      if (err) {
        callback(err, null);
        return;
      } else {
        console.log("Created model with id: ", result.insertId);
        callback(null, { model_id: result.insertId, ...newModel });
      }
    });
  }

  static findUserModels(userId, callback) {
    connection.query("SET sql_mode = ''");
    connection.query(
      "SELECT * FROM " +
        "(SELECT model_id, JSON_ARRAYAGG(Model_Likes.user_id) as likes " +
        "FROM Model " +
        "LEFT JOIN Model_Likes USING (model_id) " +
        "WHERE Model.user_id = ? " +
        "GROUP BY model_id) as t1 " +
        "INNER JOIN" +
        "(SELECT model_id, name, weights, Model.user_id, " +
        "group_id, learning_rate, optimizer, layers, " +
        "description, public, " +
        "JSON_ARRAYAGG(text) as comments " +
        "FROM Model " +
        "LEFT JOIN Comment USING (model_id) " +
        "WHERE Model.user_id = ? " +
        "GROUP BY model_id) as t2 " +
        "USING (model_id);",
      [userId, userId],
      (err, result) => {
        if (err) {
          callback(err, null);
          return;
        }
        callback(null, result);
      }
    );
  }

  static findByName(name, callback) {
    connection.query(
      "SELECT * FROM " +
        "(SELECT model_id, JSON_ARRAYAGG(Model_Likes.user_id) as likes " +
        "FROM Model " +
        "LEFT JOIN Model_Likes USING (model_id) " +
        "WHERE Model.public = 1 AND Model.name LIKE ?" +
        "GROUP BY model_id) as t1 " +
        "INNER JOIN" +
        "(SELECT model_id, name, weights, Model.user_id, " +
        "group_id, learning_rate, optimizer, layers, " +
        "description, public, " +
        "JSON_ARRAYAGG(text) as comments " +
        "FROM Model " +
        "LEFT JOIN Comment USING (model_id) " +
        "GROUP BY model_id) as t2 " +
        "USING (model_id);",
      ["%" + name + "%"],
      (err, result) => {
        if (err) {
          callback(err, null);
          return;
        }
        callback(null, result);
      }
    );
  }

  static findById(modelId, callback) {
    connection.query(
      "SELECT * FROM Model WHERE Model.model_id = ?",
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

  static update(modelId, updatedModel, callback) {
    connection.query(
      "UPDATE Model SET name = ?, learning_rate = ?," +
        " optimizer = ?, weights = ?, layers = ?, description = ?," +
        " likes = ?, public = ? WHERE Model.model_id = ?",
      [
        updatedModel.name,
        updatedModel.learning_rate,
        updatedModel.optimizer,
        updatedModel.weights,
        updatedModel.layers,
        updatedModel.description,
        updatedModel.likes,
        updatedModel.public,
        modelId,
      ],
      (err, result) => {
        if (err) {
          callback(err, null);
          return;
        }
        console.log("Updated model with id: ", modelId);
        callback(null, { model_id: modelId });
      }
    );
  }

  static delete(modelId, callback) {
    connection.query(
      "DELETE FROM Model WHERE model_id = ?",
      [modelId],
      (err, result) => {
        if (err) {
          callback(err, null);
          return;
        }
        console.log("Deleted model with id: ", modelId);
        callback(null, { model_id: modelId });
      }
    );
  }
}

module.exports = Model;
