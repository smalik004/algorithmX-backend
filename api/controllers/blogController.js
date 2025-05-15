const {
  getBlogsUser,
  addBlogUser,
  deleteBlogUser,
  updateBlogUser,
} = require("../services/blogService");

const getBlogs = async (req, res) => {
  try {
    const result = await getBlogsUser();
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err?.status).json(err);
  }
};

const addBlog = async (req, res) => {
  try {
    const payload = req.body;
    const result = await addBlogUser(payload);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err?.status).json(err);
  }
};

const deleteBlog = async (req, res) => {
  try {
    const payload = req.params;
    const result = await deleteBlogUser(payload);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err?.status).json(err);
  }
};

const updateBlog = async (req, res) => {
  try {
    const payload = req.body;
    const result = await updateBlogUser(payload);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err?.status).json(err);
  }
};

module.exports = { getBlogs, addBlog, deleteBlog, updateBlog };
