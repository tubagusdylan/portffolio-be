const express = require("express");
const router = express.Router();

const queryHandler = require("../controllers/project_images/queries/queryHandler");
const commandHandler = require("../controllers/project_images/commands/commandHandler");
const verifyToken = require("../middleware/verifyToken");
const checkAdmin = require("../middleware/checkAdmin");
const upload = require("../helper/multer/multer");

router.get("/:id", verifyToken, queryHandler.getDetailImageHandler);
router.delete("/:id", verifyToken, checkAdmin, commandHandler.deleteImageHandler);
router.get("/", verifyToken, queryHandler.getImagesHandler);
router.post("/", verifyToken, upload.single("image"), commandHandler.addImageHandler);

module.exports = router;
