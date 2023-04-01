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
    connection.query(
      "SELECT * FROM Model WHERE Model.user_id = ?",
      [userId],
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
      "SELECT * FROM Model WHERE Model.name LIKE ?",
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
        " optimizer = ?, weights = ?, layers = ? WHERE Model.model_id = ?",
      [
        updatedModel.name,
        updatedModel.learning_rate,
        updatedModel.optimizer,
        updatedModel.weights,
        updatedModel.layers,
        modelId,
      ],
      (err, result) => {
        if (err) {
          callback(err, null);
          return;
        }
        console.log("Updated model with id: ", updatedModel.model_id);
        callback(null, { ...updatedModel });
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
