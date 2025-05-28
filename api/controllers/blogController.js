const {
  getBlogsUser,
  addBlogUser,
  deleteBlogUser,
  updateBlogUser,
  getBlogByIdUser,
  getCategoriesUser,
  addCategoriesUser,
  updateCategoryUser,
  deleteCategoryUser,
  blogViewUser,
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
    const file = req.file?.filename;
    const result = await updateBlogUser(payload, file);
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

const getCategories = async (req, res) => {
  try {
    const result = await getCategoriesUser();
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err?.status).json(err);
  }
};

const addCategories = async (req, res) => {
  try {
    const payload = req.body;
    const result = await addCategoriesUser(payload);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err?.status).json(err);
  }
};

const updateCategory = async (req, res) => {
  try {
    const params = req.params;
    const body = req.body;
    const result = await updateCategoryUser(params, body);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err?.status).json(err);
  }
};

const deleteCategory = async (req, res) => {
  try {
    const params = req.params;
    const result = await deleteCategoryUser(params);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(err?.status).json(err);
  }
};

const blogView = async (req, res) => {
  try {
    const params = req.params;
    const body = req.body;
    if (body) {
      const result = await blogViewUser(params, body);
      res.status(result.status).json(result);
    } else {
      res.status(400).json({
        message: "payload is required",
      });
    }
  } catch (err) {
    res.status(err?.status).json(err);
  }
};

module.exports = {
  getBlogs,
  addBlog,
  deleteBlog,
  updateBlog,
  getBlogById,
  getCategories,
  addCategories,
  updateCategory,
  deleteCategory,
  blogView,
};
