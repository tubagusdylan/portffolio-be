const express = require("express");
const router = express.Router();

const queryHandler = require("../controllers/users/queries/queryHandler");
const commandHandler = require("../controllers/users/commands/commandHandler");
const middleware = require("../middleware/verifyToken");

router.get("/token", queryHandler.getRefreshTokenHandler);
router.post("/login", commandHandler.loginHandler);
router.delete("/logout", commandHandler.logoutHandler);
router.get("/:id", middleware.verifyToken, queryHandler.getDetailUserHandler);
router.put("/:id", middleware.verifyToken, commandHandler.updateUserHandler);
router.delete("/:id", middleware.verifyToken, commandHandler.deleteUserHandler);
router.get("/", middleware.verifyToken, queryHandler.getUsersHandler);
router.post("/", middleware.verifyToken, commandHandler.addUserHandler);

module.exports = router;
