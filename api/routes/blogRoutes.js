const express = require("express");
const router = express.Router();
const {
  getBlogs,
  addBlog,
  deleteBlog,
  updateBlog,
  getBlogById,
} = require("../controllers/blogController");
const { isAuthorized } = require("../middleware/authMiddleware");
const { optionalUpload } = require("../middleware/imageUploadMiddleware");

router.get("/get-blogs", isAuthorized, getBlogs);
router.post("/add-blog", isAuthorized, optionalUpload, addBlog);
router.patch("/delete-blog/:blogId", isAuthorized, deleteBlog);
router.put("/update-blog", isAuthorized, optionalUpload, updateBlog);
router.get("/:blogId", isAuthorized, getBlogById);

module.exports = router;
