var express = require("express");
var router = express.Router();

var modelController = require("../controllers/model");

router.post("/create", modelController.createModel);

router.put("/update", modelController.updateModel);

router.delete("/delete", modelController.deleteModel);

router.get("/:name/getByName", modelController.getByName);

router.get("/:modelId/getById", modelController.getById);

router.get("/:userId/getUserModels", modelController.getUserModels);

module.exports = router;
