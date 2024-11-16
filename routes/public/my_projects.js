const express = require("express");
const router = express.Router();

const queryHandler = require("../../controllers/my_projects/queries/queryHandler");

router.get("/:id", queryHandler.getDetailProjectHandler);
router.get("/", queryHandler.getProjectsHandler);

module.exports = router;
