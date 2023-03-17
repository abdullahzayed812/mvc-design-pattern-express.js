const express = require("express");
const router = express.Router();
const registerController = require("../controllers/registerController");

router
  .route("/")
  .get(registerController.getAllUsers)
  .post(registerController.handleNewUser);

module.exports = router;
