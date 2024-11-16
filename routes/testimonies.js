const express = require("express");
const router = express.Router();

const queryHandler = require("../controllers/testimonies/queries/queryHandler");
const commandHandler = require("../controllers/testimonies/commands/commandHandler");
const verifyToken = require("../middleware/verifyToken");
const checkAdmin = require("../middleware/checkAdmin");

router.get("/:id", verifyToken, queryHandler.getDetailTestiHandler);
router.delete("/:id", verifyToken, checkAdmin, commandHandler.deleteTestimonieHandler);
router.get("/", verifyToken, queryHandler.getTestimoniesHandler);

module.exports = router;
