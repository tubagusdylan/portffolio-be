const express = require("express");
const router = express.Router();
const Users = require("./users");
const Blogs = require("./blogs");
const PublicBlogs = require("./public/blogs");

router.use("/admin/users", Users);
router.use("/admin/blogs", Blogs);
router.use("/public/blogs", PublicBlogs);
// user-q5Ajma0JZEbKDa7b-IyXH


module.exports = router;
