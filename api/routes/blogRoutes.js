const express = require("express");
const router = express.Router();
const {
  getBlogs,
  addBlog,
  deleteBlog,
  updateBlog,
  getBlogById,
  getCategories,
  addCategories,
} = require("../controllers/blogController");
const { isAuthorized } = require("../middleware/authMiddleware");
const { dynamicUpload } = require("../middleware/imageUploadMiddleware");

router.get("/get-blogs", getBlogs);
router.post(
  "/add-blog",
  isAuthorized,
  dynamicUpload("blog_image", "blog-images"),
  addBlog
);
router.patch("/delete-blog/:blogId", isAuthorized, deleteBlog);
router.put(
  "/update-blog",
  isAuthorized,
  dynamicUpload("blog_image", "blog-images"),
  updateBlog
);
router.get("/:blogId", getBlogById);

// categories
router.get("/", getCategories);
router.post(
  "/",
  isAuthorized,
  addCategories
);

module.exports = router;
