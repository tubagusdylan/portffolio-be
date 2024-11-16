const express = require("express");
const router = express.Router();

const queryHandler = require("../../controllers/blogs/queries/queryHandler");

router.get("/:id", queryHandler.getDetailBlogHandler);
router.get("/", queryHandler.getBlogsHandler);

module.exports = router;
