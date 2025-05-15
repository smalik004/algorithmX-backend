const blogs = require("../models/blogsModel");
const { rejectResponse, successResponse } = require("../utils/response");
const StatusCode = require("../utils/statusCode");

const getBlogsUser = async () => {
  try {
    const result = await blogs.findAll({
      where: {
        isActive: true,
      },
    });
    return successResponse(StatusCode.SUCCESS.OK, "Success!", result);
  } catch (err) {
    throw rejectResponse(
      StatusCode.SERVER_ERROR.INTERNAL_SERVER_ERROR,
      err?.message
    );
  }
};

const addBlogUser = async (payload) => {
  try {
    const data = {
      blog_id: `BL${payload?.title?.substring(0, 3) ?? "UNK"}${Date.now()}`,
      slug: payload?.slug,
      title: payload?.title,
      meta_description: payload?.meta_description,
      meta_tags: payload?.meta_tags,
      meta_keywords: payload?.meta_keywords,
      summary: payload?.summary,
      content: payload?.content,
      image_url: payload?.url,
      image_alt: payload?.image_alt,
      category: payload?.category,
      tags: payload?.tags,
      post_date: payload?.post_date,
      author_id: payload.author_id,
      author_name: payload.author_name,
      author_ip: payload.author_ip,
      views: "12",
      status: payload?.status,
      is_featured: false,
    };
    const result = await blogs.create(data);
    if (result) {
      return successResponse(StatusCode.SUCCESS.OK, "Blog Added Successfully!");
    }
  } catch (err) {
    throw rejectResponse(
      StatusCode.SERVER_ERROR.INTERNAL_SERVER_ERROR,
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
          StatusCode.SUCCESS.OK,
          "Blog deleted successfully!"
        );
      }
    } else {
      return rejectResponse(
        StatusCode.CLIENT_ERROR.NOT_FOUND,
        "Blog not found!"
      );
    }
  } catch (err) {
    throw rejectResponse(
      StatusCode.SERVER_ERROR.INTERNAL_SERVER_ERROR,
      err?.message
    );
  }
};

const updateBlogUser = async (payload) => {
  try {
    const isBlogExist = await blogs.findOne({
      where: {
        id: payload?.blogId,
      },
    });
    if (isBlogExist) {
      const data = {
        slug: payload?.slug,
        title: payload?.title,
        meta_description: payload?.meta_description,
        meta_tags: payload?.meta_tags,
        meta_keywords: payload?.meta_keywords,
        summary: payload?.summary,
        content: payload?.content,
        image_url: payload?.url,
        image_alt: payload?.image_alt,
        category: payload?.category,
        tags: payload?.tags,
        post_date: payload?.post_date,
        author_id: payload.author_id,
        author_name: payload.author_name,
        author_ip: payload.author_ip,
        status: payload?.status,
        is_featured: false,
        updatedAt: new Date(),
      };
      const updateBlog = await isBlogExist.update(data);
      if (updateBlog) {
        return successResponse(
          StatusCode.SUCCESS.OK,
          "Blog updated successfully!"
        );
      }
    } else {
      return rejectResponse(
        StatusCode.CLIENT_ERROR.NOT_FOUND,
        "Blog not found!"
      );
    }
  } catch (err) {
    throw rejectResponse(
      StatusCode.SERVER_ERROR.INTERNAL_SERVER_ERROR,
      err?.message
    );
  }
};

module.exports = {
  getBlogsUser,
  addBlogUser,
  deleteBlogUser,
  updateBlogUser,
};
