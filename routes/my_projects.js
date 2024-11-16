const express = require("express");
const router = express.Router();

const queryHandler = require("../controllers/my_projects/queries/queryHandler");
const commandHandler = require("../controllers/my_projects/commands/commandHandler");
const verifyToken = require("../middleware/verifyToken");
const checkAdmin = require("../middleware/checkAdmin");

router.get("/:id", verifyToken, queryHandler.getDetailProjectHandler);
router.put("/:id", verifyToken, commandHandler.updateProjectHandler);
router.delete("/:id", verifyToken, checkAdmin, commandHandler.deleteProjectHandler);
router.get("/", verifyToken, queryHandler.getProjectsHandler);
router.post("/", verifyToken, commandHandler.addProjectHandler);

module.exports = router;
