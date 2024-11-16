const express = require("express");
const router = express.Router();

const queryHandler = require("../../controllers/testimonies/queries/queryHandler");
const commandHandler = require("../../controllers/testimonies/commands/commandHandler");

router.post("/", commandHandler.addTestimonieHandler);
router.get("/", queryHandler.getTestimoniesHandler);

module.exports = router;
