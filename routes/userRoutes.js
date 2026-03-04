const express = require("express");
const router = express.Router();

const userController = require("../controllers/userControllers");

router.post("/user-signup", userController.userSignUp);
router.post("/user-login", userController.userLogin)

module.exports = router;