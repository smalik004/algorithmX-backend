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
const multer = require("multer");
const path = require("path");

// Correct storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../../public/blog-images"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + file.originalname;
    cb(null, uniqueSuffix);
  },
});

// Optional: allow only image file types
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const extName = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimeType = allowedTypes.test(file.mimetype);

  if (extName && mimeType) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed!"));
  }
};

const upload = multer({
  storage,
  fileFilter,
});

router.get("/get-blogs", isAuthorized, getBlogs);
router.post("/add-blog", isAuthorized, upload.single("blog_image"), addBlog);
router.patch("/delete-blog/:blogId", isAuthorized, deleteBlog);
router.put(
  "/update-blog",
  isAuthorized,
  upload.single("blog_image"),
  updateBlog
);
router.get("/:blogId", isAuthorized, getBlogById);

module.exports = router;
