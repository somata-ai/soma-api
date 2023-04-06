const { connection } = require("../config/db.config");

class GroupMember {
  static create(newGroupMember, callback) {
    connection.query(
      "INSERT INTO GroupMember Set ?",
      newGroupMember,
      (err, result) => {
        if (err) {
          callback(err, null);
          return;
        } else {
          console.log("Created group member with id: ", result.insertId);
          callback(null, { ...newGroupMember });
        }
      }
    );
  }

  static delete(groupId, userId, callback) {
    connection.query(
      "DELETE FROM GroupMember WHERE group_id = ? AND user_id = ?",
      [groupId, userId],
      (err, result) => {
        if (err) {
          callback(err, null);
          return;
        }
        console.log(
          `Deleted group member with group id: ${groupId} and user id ${userId}`
        );
        callback(null, { group_id: groupId, user_id: userId });
      }
    );
  }
}

module.exports = GroupMember;
