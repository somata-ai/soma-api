var express = require("express");
var router = express.Router();

var groupController = require("../controllers/group");

router.post("/create", groupController.createGroup);

router.put("/update", groupController.updateGroup);

router.delete("/delete", groupController.deleteGroup);

router.get("/:name/getByName", groupController.getByName);

router.get("/:modelId/getById", groupController.getById);

module.exports = router;
