const express = require("express");
const router = express.Router();

const queryHandler = require("../controllers/users/queries/queryHandler");
const commandHandler = require("../controllers/users/commands/commandHandler");
const verifyToken = require("../middleware/verifyToken");
const checkAdmin = require("../middleware/checkAdmin");

router.get("/token", queryHandler.getRefreshTokenHandler);
router.post("/login", commandHandler.loginHandler);
router.delete("/logout", commandHandler.logoutHandler);
router.get("/:id", verifyToken, queryHandler.getDetailUserHandler);
router.put("/:id", verifyToken, commandHandler.updateUserHandler);
router.delete("/:id", verifyToken, checkAdmin, commandHandler.deleteUserHandler);
router.get("/", verifyToken, queryHandler.getUsersHandler);
router.post("/", verifyToken, commandHandler.addUserHandler);

module.exports = router;
