const express = require("express");
const router = express.Router();
const Users = require("./users");
const Blogs = require("./blogs");
const PublicBlogs = require("./public/blogs");
const MyProjects = require("./my_projects");
const PublicProjects = require("./public/my_projects");
const Testimonies = require("./testimonies");
const PublicTestimonies = require("./public/testimonies");

router.use("/admin/users", Users);
router.use("/admin/blogs", Blogs);
router.use("/admin/my-projects", MyProjects);
router.use("/admin/testimonies", Testimonies);

router.use("/public/blogs", PublicBlogs);
router.use("/public/my-projects", PublicProjects);
router.use("/public/testimonies", PublicTestimonies);

module.exports = router;
