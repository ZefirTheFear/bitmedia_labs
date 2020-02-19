const express = require("express");

const userRoutesController = require("../controllers/userRoutesController");

const router = express.Router();

router.get("/", userRoutesController.getUsersStatistics);

module.exports = router;
