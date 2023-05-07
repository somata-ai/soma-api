var express = require("express");
var router = express.Router();

var userController = require("../controllers/user");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/create", userController.createUserByPassword);

router.put("/update", userController.updateUser);

router.delete("/:userId/delete", userController.deleteUser);

router.get("/:name/getByName", userController.getByName);

router.get("/:userId/getById", userController.getById);

//Login a user.
router.post("/login", userController.loginUser);

module.exports = router;
