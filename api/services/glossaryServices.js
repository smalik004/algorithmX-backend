const { rejectResponse, successResponse } = require("../utils/response");
const { statusCode } = require("../utils/statusCode");
const glossary = require("../models/glossaryModel");

const getGlossariesUser = async () => {
  try {
    const result = await glossary.findAll();
    return successResponse(statusCode.SUCCESS.OK, "Success!", result);
  } catch (err) {
    throw rejectResponse(
      statusCode.SERVER_ERROR.INTERNAL_SERVER_ERROR,
      err?.message
    );
  }
};

const addGlossaryUser = async (payload) => {
  try {
    const { keyword, summary, content } = payload;
    const isGlossaryExist = await glossary.findOne({
      where: {
        keyword,
      },
    });
    if (isGlossaryExist) {
      return rejectResponse(
        statusCode.CLIENT_ERROR.CONFLICT,
        "Keyword Already Exist!"
      );
    } else {
      const data = {
        keyword,
        summary,
        content,
      };
      const result = await glossary.create(data);
      if (result) {
        return successResponse(
          statusCode.SUCCESS.CREATED,
          "Glossary Added Successfully!"
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

const updateGlossaryUser = async (params, body) => {
  try {
    const { keyword, summary, content } = body;
    const isGlossaryExist = await glossary.findOne({
      where: {
        id: params?.glossaryId,
      },
    });
    if (isGlossaryExist) {
      const data = {
        keyword,
        summary,
        content,
        updatedAt: new Date(),
      };
      const result = await isGlossaryExist.update(data);
      if (result) {
        return successResponse(
          statusCode.SUCCESS.CREATED,
          "Glossary Updated Successfully!"
        );
      }
    } else {
      return rejectResponse(
        statusCode.CLIENT_ERROR.NOT_FOUND,
        "Glossary not found!"
      );
    }
  } catch (err) {
    throw rejectResponse(
      statusCode.SERVER_ERROR.INTERNAL_SERVER_ERROR,
      err?.message
    );
  }
};

const deleteGlossaryUser = async (params) => {
  try {
    const isGLossaryExist = await glossary.findOne({
      where: {
        id: params?.glossaryId,
      },
    });
    if (isGLossaryExist) {
      const result = await isGLossaryExist.destroy();
      if (result) {
        return successResponse(
          statusCode.SUCCESS.OK,
          "Glossary Deleted Successfully!"
        );
      }
    } else {
      return rejectResponse(
        statusCode.CLIENT_ERROR.NOT_FOUND,
        "Glossary not found!"
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
  getGlossariesUser,
  addGlossaryUser,
  updateGlossaryUser,
  deleteGlossaryUser,
};
