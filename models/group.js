class Group {
  static create(newGroup, callback) {
    connection.query("INSERT INTO Group Set ?", newGroup, (err, result) => {
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
      "SELECT * FROM Group WHERE Group.name LIKE ?",
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
      "SELECT * FROM Group WHERE Group.group_id = ?",
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
      "UPDATE Group SET name = ?, description = ? WHERE Group.group_id = ?",
      [updatedGroup.name, updatedGroup.description, groupId],
      (err, result) => {
        if (err) {
          callback(err, null);
          return;
        }
        console.log("Updated group with id: ", updatedGroup.groupId);
        callback(null, { ...updatedGroup });
      }
    );
  }

  static delete(groupId, callback) {
    connection.query(
      "DELETE FROM Group WHERE group_id = ?",
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
