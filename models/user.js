class User {
  static create(newUser, callback) {
    connection.query("INSERT INTO User Set ?", newUser, (err, result) => {
      if (err) {
        callback(err, null);
        return;
      } else {
        console.log("Created user with id: ", result.insertId);
        callback(null, { user_id: result.insertId, ...newUser });
      }
    });
  }

  static findByName(name, callback) {
    connection.query(
      "SELECT * FROM User WHERE User.username LIKE ?",
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

  static findById(userId, callback) {
    connection.query(
      "SELECT * FROM User WHERE User.user_id = ?",
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

  static delete(userId, callback) {
    connection.query(
      "DELETE FROM User WHERE user_id = ?",
      [userId],
      (err, result) => {
        if (err) {
          callback(err, null);
          return;
        }
        console.log("Deleted user with id: ", userId);
        callback(null, { user_id: userId });
      }
    );
  }
}

module.exports = User;
