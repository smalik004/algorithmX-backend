const {
  getBlogsUser,
  addBlogUser,
  deleteBlogUser,
  updateBlogUser,
  getBlogByIdUser,
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
    const file = req.file?.filename;
    const result = await addBlogUser(payload, file);
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

const getBlogById = async (req, res) => {
  try {
    const payload = req.params;
    const result = await getBlogByIdUser(payload);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err?.status).json(err);
  }
};

module.exports = { getBlogs, addBlog, deleteBlog, updateBlog, getBlogById };
