const blogCategories = require("../models/blogCategoriesModel");
const blogs = require("../models/blogsModel");
const blogViews = require("../models/blogViews.Model");
const { rejectResponse, successResponse } = require("../utils/response");
const { statusCode } = require("../utils/statusCode");

const getBlogsUser = async () => {
  try {
    const result = await blogs.findAll({
      where: {
        isActive: true,
      },
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: blogCategories,
          as: "category",
          attributes: ["id", "title"],
        },
      ],
    });
    return successResponse(statusCode.SUCCESS.OK, "Success!", result);
  } catch (err) {
    throw rejectResponse(
      statusCode.SERVER_ERROR.INTERNAL_SERVER_ERROR,
      err?.message
    );
  }
};

const addBlogUser = async (payload, file) => {
  try {
    const parsedTags = JSON.parse(payload?.tags || "[]");
    const parsedMetaTags = JSON.parse(payload?.meta_tags || "[]");
    const parsedMetaKeywords = JSON.parse(payload?.meta_keywords || "[]");
    const data = {
      blog_id: `BL${payload?.title?.substring(0, 3) ?? "UNK"}${Date.now()}`,
      slug: payload?.slug,
      title: payload?.title,
      meta_description: payload?.meta_description,
      meta_tags: parsedMetaTags,
      meta_keywords: parsedMetaKeywords,
      summary: payload?.summary,
      content: payload?.content,
      image_url: `${process.env.BASE_URL}/blog-images/${file}`,
      image_alt: payload?.image_alt,
      category_id: payload?.category_id,
      tags: parsedTags,
      post_date: payload?.post_date,
      author_id: payload.author_id,
      author_name: payload.author_name,
      author_ip: payload.author_ip,
      status: payload?.status,
      is_featured: payload?.is_featured,
    };
    const result = await blogs.create(data);
    if (result) {
      return successResponse(
        statusCode.SUCCESS.CREATED,
        "Blog Added Successfully!"
      );
    }
  } catch (err) {
    throw rejectResponse(
      statusCode.SERVER_ERROR.INTERNAL_SERVER_ERROR,
      err?.message
    );
  }
};

const deleteBlogUser = async (payload) => {
  try {
    const isBlogExist = await blogs.findOne({
      where: {
        id: payload?.blogId,
      },
    });
    if (isBlogExist) {
      const data = {
        isActive: false,
        updatedAt: new Date(),
      };
      const updateBlog = await isBlogExist.update(data);
      if (updateBlog) {
        return successResponse(
          statusCode.SUCCESS.OK,
          "Blog deleted successfully!"
        );
      }
    } else {
      return rejectResponse(
        statusCode.CLIENT_ERROR.NOT_FOUND,
        "Blog not found!"
      );
    }
  } catch (err) {
    throw rejectResponse(
      statusCode.SERVER_ERROR.INTERNAL_SERVER_ERROR,
      err?.message
    );
  }
};

const updateBlogUser = async (payload, file) => {
  try {
    const isBlogExist = await blogs.findOne({
      where: {
        id: payload?.blogId,
      },
    });
    if (isBlogExist) {
      const parsedTags = JSON.parse(payload?.tags || "[]");
      const parsedMetaTags = JSON.parse(payload?.meta_tags || "[]");
      const parsedMetaKeywords = JSON.parse(payload?.meta_keywords || "[]");
      const data = {
        slug: payload?.slug,
        title: payload?.title,
        meta_description: payload?.meta_description,
        meta_tags: parsedMetaTags,
        meta_keywords: parsedMetaKeywords,
        summary: payload?.summary,
        content: payload?.content,
        image_url: file
          ? `${process.env.BASE_URL}/blog-images/${file}`
          : payload?.blog_image,
        image_alt: payload?.image_alt,
        category_id: payload?.category_id,
        tags: parsedTags,
        post_date: payload?.post_date,
        author_id: payload.author_id,
        author_name: payload.author_name,
        author_ip: payload.author_ip,
        status: payload?.status,
        is_featured: payload?.is_featured,
        updatedAt: new Date(),
      };
      const updateBlog = await isBlogExist.update(data);
      if (updateBlog) {
        return successResponse(
          statusCode.SUCCESS.OK,
          "Blog updated successfully!"
        );
      }
    } else {
      return rejectResponse(
        statusCode.CLIENT_ERROR.NOT_FOUND,
        "Blog not found!"
      );
    }
  } catch (err) {
    throw rejectResponse(
      statusCode.SERVER_ERROR.INTERNAL_SERVER_ERROR,
      err?.message
    );
  }
};

const getBlogByIdUser = async (payload) => {
  try {
    const result = await blogs.findOne({
      where: {
        id: payload?.blogId,
        isActive: true,
      },
      include: [
        {
          model: blogCategories,
          as: "category",
          attributes: ["id", "title"],
        },
      ],
    });
    return successResponse(statusCode.SUCCESS.OK, "Success!", result);
  } catch (err) {
    throw rejectResponse(
      statusCode.SERVER_ERROR.INTERNAL_SERVER_ERROR,
      err?.message
    );
  }
};

const getCategoriesUser = async () => {
  try {
    const result = await blogCategories.findAll();
    return successResponse(statusCode.SUCCESS.OK, "Success!", result);
  } catch (err) {
    throw rejectResponse(
      statusCode.SERVER_ERROR.INTERNAL_SERVER_ERROR,
      err?.message
    );
  }
};

const addCategoriesUser = async (payload) => {
  try {
    const { title } = payload;

    const isCategoryExist = await blogCategories.findOne({
      where: {
        title,
      },
    });
    if (isCategoryExist) {
      return rejectResponse(
        statusCode.CLIENT_ERROR.CONFLICT,
        "Category Already Exist!"
      );
    } else {
      const data = {
        title,
      };
      const result = await blogCategories.create(data);
      if (result) {
        return successResponse(
          statusCode.SUCCESS.CREATED,
          "Category Added Successfully!"
        );
      }
    }
  } catch (err) {
    throw rejectResponse(
      statusCode.SERVER_ERROR.INTERNAL_SERVER_ERROR,
      err?.message
    );
  }
};

const updateCategoryUser = async (params, body) => {
  try {
    const { title } = body;

    const isCategoryExist = await blogCategories.findOne({
      where: {
        id: params?.categoryId,
      },
    });
    if (isCategoryExist) {
      const data = {
        title,
        updatedAt: new Date(),
      };
      const result = await isCategoryExist.update(data);
      if (result) {
        return successResponse(
          statusCode.SUCCESS.OK,
          "Category Updated Successfully!"
        );
      }
    } else {
      return rejectResponse(
        statusCode.CLIENT_ERROR.NOT_FOUND,
        "Category doesn't Exist!"
      );
    }
  } catch (err) {
    throw rejectResponse(
      statusCode.SERVER_ERROR.INTERNAL_SERVER_ERROR,
      err?.message
    );
  }
};

const deleteCategoryUser = async (params) => {
  try {
    const isCategoryExist = await blogCategories.findOne({
      where: {
        id: params?.categoryId,
      },
    });
    if (isCategoryExist) {
      const result = await isCategoryExist.destroy();
      if (result) {
        return successResponse(
          statusCode.SUCCESS.OK,
          "Category Deleted Successfully!"
        );
      }
    } else {
      return rejectResponse(
        statusCode.CLIENT_ERROR.NOT_FOUND,
        "Category doesn't Exist!"
      );
    }
  } catch (err) {
    throw rejectResponse(
      statusCode.SERVER_ERROR.INTERNAL_SERVER_ERROR,
      err?.message
    );
  }
};

const blogViewUser = async (params, body) => {
  const { device_token } = body;
  const { blogId } = params;

  if (!body.device_token) {
    return rejectResponse(
      statusCode.CLIENT_ERROR.BAD_REQUEST,
      "Missing device token!"
    );
  }

  try {
    const isBlogExist = await blogs.findOne({
      where: {
        id: blogId,
      },
    });
    if (isBlogExist) {
      const isViewExist = await blogViews.findOne({
        where: { blog_id: blogId, device_token },
      });
      if (isViewExist) {
        return rejectResponse(
          statusCode.CLIENT_ERROR.CONFLICT,
          "View already registered from same user with same blog!"
        );
      } else {
        const addView = await blogViews.create({
          blog_id: blogId,
          device_token,
        });
        await isBlogExist.update({ views: isBlogExist.views + 1 });
        if (addView) {
          return successResponse(
            statusCode.SUCCESS.OK,
            "View Added Successfully!"
          );
        }
      }
    } else {
      return rejectResponse(
        statusCode.CLIENT_ERROR.BAD_REQUEST,
        "Blog doesn't exist!"
      );
    }
  } catch (err) {
    throw rejectResponse(
      statusCode.SERVER_ERROR.INTERNAL_SERVER_ERROR,
      err?.message
    );
  }
};

module.exports = {
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
};
