const { connection } = require("../config/db.config");

class Group {
  static create(newGroup, callback) {
    connection.query("INSERT INTO UserGroup Set ?", newGroup, (err, result) => {
      if (err) {
        callback(err, null);
        return;
      } else {
        console.log("Created group with id: ", result.insertId);
        callback(null, { group_id: result.insertId, ...newGroup });
      }
    });
  }

  static findByName(name, callback) {
    connection.query(
      "SELECT * FROM UserGroup WHERE UserGroup.name LIKE ?",
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

  static findById(groupId, callback) {
    connection.query(
      "SELECT * FROM UserGroup WHERE UserGroup.group_id = ?",
      [groupId],
      (err, result) => {
        if (err) {
          callback(err, null);
          return;
        }
        callback(null, result);
      }
    );
  }

  static update(groupId, updatedGroup, callback) {
    connection.query(
      "UPDATE UserGroup SET name = ?, description = ? WHERE UserGroup.group_id = ?",
      [updatedGroup.name, updatedGroup.description, groupId],
      (err, result) => {
        if (err) {
          callback(err, null);
          return;
        }
        console.log("Updated group with id: ", updatedGroup.groupId);
        callback(null, { group_id: groupId });
      }
    );
  }

  static delete(groupId, callback) {
    connection.query(
      "DELETE FROM UserGroup WHERE group_id = ?",
      [groupId],
      (err, result) => {
        if (err) {
          callback(err, null);
          return;
        }
        console.log("Deleted group with id: ", groupId);
        callback(null, { group_id: groupId });
      }
    );
  }
}

module.exports = Group;
