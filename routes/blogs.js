const express = require("express");
const router = express.Router();

const queryHandler = require("../controllers/blogs/queries/queryHandler");
const commandHandler = require("../controllers/blogs/commands/commandHandler");
const verifyToken = require("../middleware/verifyToken");
const checkAdmin = require("../middleware/checkAdmin");

router.get("/:id", verifyToken, queryHandler.getDetailBlogHandler);
router.put("/:id", verifyToken, commandHandler.updateBlogHandler);
router.delete("/:id", verifyToken, checkAdmin, commandHandler.deleteBlogHandler);
router.get("/", verifyToken, queryHandler.getBlogsHandler);
router.post("/", verifyToken, commandHandler.addBlogHandler);

module.exports = router;
