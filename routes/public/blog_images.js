const express = require("express");
const router = express.Router();

const queryHandler = require("../../controllers/blog_images/queries/queryHandler");

router.get("/", queryHandler.getImagesHandler);

module.exports = router;
