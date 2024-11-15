const express = require("express");
const router = express.Router();
const Users = require("./users");

router.use("/admin/users", Users);

// const appGreetings = (req, res) => {
//   try {
//     return res.status(200).json({
//       code: 200,
//       success: true,
//       message: "Halo, aplikasi sudah berjalan",
//       data: {},
//     });
//   } catch (error) {
//     res.status(500).json({
//       code: 500,
//       success: false,
//       error: error,
//       data: {},
//     });
//   }
// };

// router.get("/", appGreetings);
// router.get("/api/v1/admin/users", verifyToken, getUsers);
// router.post("/api/v1/admin/users", addUser);
// router.put("/api/v1/admin/users", verifyToken, updatePassword);
// router.get("/api/v1/admin/users/refreshToken", refreshToken);
// router.post("/api/v1/admin/users/login", login);
// router.delete("/api/v1/admin/users/logout", logOut);
// router.get("/api/v1/admin/users/:id", verifyToken, getDetailUser);
// router.delete("/api/v1/admin/users/:id", verifyToken, deleteUser);

// router.get("/api/v1/admin/blogs", verifyToken, getBlogs);
// router.post("/api/v1/admin/blogs", verifyToken, addBlog);
// router.put("/api/v1/admin/blogs", verifyToken, updateBlog);
// router.get("/api/v1/admin/blogs/:id", verifyToken, getDetailBlog);
// router.delete("/api/v1/admin/blogs/:id", verifyToken, deleteBlog);

// router.get("/api/v1/blogs", getBlogs);
// router.get("/api/v1/blogs/:id", getDetailBlog);

module.exports = router;
