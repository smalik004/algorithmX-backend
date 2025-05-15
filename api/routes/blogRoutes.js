const express = require("express");
const router = express.Router();
const {
  getBlogs,
  addBlog,
  deleteBlog,
  updateBlog,
} = require("../controllers/blogController");
const { isAuthorized } = require("../middleware/authMiddleware");

router.get("/get-blogs", isAuthorized, getBlogs);
router.post("/add-blog", isAuthorized, addBlog);
router.patch("/delete-blog/:blogId", isAuthorized, deleteBlog);
router.put("/update-blog", isAuthorized, updateBlog);

module.exports = router;
