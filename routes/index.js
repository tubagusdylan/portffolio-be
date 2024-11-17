const express = require("express");
const router = express.Router();
const Users = require("./users");
const Blogs = require("./blogs");
const PublicBlogs = require("./public/blogs");
const MyProjects = require("./my_projects");
const PublicProjects = require("./public/my_projects");
const Testimonies = require("./testimonies");
const PublicTestimonies = require("./public/testimonies");
const BlogImages = require("./blog_images");
const PublicBlogImages = require("./public/blog_images");
const ProjectImages = require("./project_images");
const PublicProjectImages = require("./public/project_images");

router.use("/admin/users", Users);
router.use("/admin/blogs", Blogs);
router.use("/admin/blog-images", BlogImages);
router.use("/admin/my-projects", MyProjects);
router.use("/admin/project-images", ProjectImages);
router.use("/admin/testimonies", Testimonies);

router.use("/public/blogs", PublicBlogs);
router.use("/public/blog-images", PublicBlogImages);
router.use("/public/my-projects", PublicProjects);
router.use("/public/project-images", PublicProjectImages);
router.use("/public/testimonies", PublicTestimonies);

module.exports = router;
