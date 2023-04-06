var express = require("express");
var router = express.Router();

var groupMemberController = require("../controllers/group_member");

router.post("/create", groupMemberController.createGroupMember);

router.delete("/delete", groupMemberController.deleteGroupMember);

module.exports = router;
