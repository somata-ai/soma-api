const { connection } = require("../config/db.config");

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
      "SELECT * FROM User WHERE User.username = ?",
      [name],
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

  static update(userId, updatedUser, callback) {
    connection.query(
      "UPDATE User SET username = ?, password = ?," +
        " email = ?, bio = ?, profile_picture_url = ?," +
        " wallpaper_url = ? WHERE User.user_id = ?",
      [
        updatedUser.username,
        updatedUser.password,
        updatedUser.email,
        updatedUser.profile_picture_url,
        updatedUser.wallpaper_url,
        updatedUser.bio,
        userId,
      ],
      (err, result) => {
        if (err) {
          callback(err, null);
          return;
        }
        console.log("Updated user with id: ", userId);
        callback(null, { user_id: userId });
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
