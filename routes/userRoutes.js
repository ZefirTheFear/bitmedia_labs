const express = require("express");

const userRoutesController = require("../controllers/userRoutesController");

const router = express.Router();

router.get("/", userRoutesController.getUsersStatistics);

router.get("/:userId", userRoutesController.getUserData);

module.exports = router;
