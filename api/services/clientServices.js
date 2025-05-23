const { rejectResponse, successResponse } = require("../utils/response");
const { statusCode } = require("../utils/statusCode");
const clients = require("../models/clientsModel");
const blogCategories = require("../models/blogCategoriesModel");

const getClientsUser = async () => {
  try {
    const result = await clients.findAll({
      where: {
        isActive: true,
      },
    });
    return successResponse(statusCode.SUCCESS.OK, "Success!", result);
  } catch (err) {
    throw rejectResponse(
      statusCode.SERVER_ERROR.INTERNAL_SERVER_ERROR,
      err?.message
    );
  }
};

const addClientUser = async (payload) => {
  try {
    const data = {
      brandName: payload?.brandName,
      brandCategory: payload?.brandCategory,
      brandRegion: payload?.brandRegion,
      brandRequirement: payload?.brandRequirement,
      title: payload?.title,
    };
    const result = await clients.create(data);
    if (result) {
      return successResponse(
        statusCode.SUCCESS.CREATED,
        "Client Added Successfully!"
      );
    }
  } catch (err) {
    throw rejectResponse(
      statusCode.SERVER_ERROR.INTERNAL_SERVER_ERROR,
      err?.message
    );
  }
};

const deleteClientUser = async (payload) => {
  try {
    const isClientExist = await clients.findOne({
      where: {
        id: payload?.clientId,
        isActive: true,
      },
    });
    if (isClientExist) {
      const data = {
        isActive: false,
        updatedAt: new Date(),
      };
      const updateClient = isClientExist.update(data);
      if (updateClient) {
        return successResponse(
          statusCode.SUCCESS.OK,
          "Client Deleted Successfully!"
        );
      }
    } else {
      return rejectResponse(
        statusCode.CLIENT_ERROR.NOT_FOUND,
        "Client doesn't exist!"
      );
    }
  } catch (err) {
    throw rejectResponse(
      statusCode.SERVER_ERROR.INTERNAL_SERVER_ERROR,
      err?.message
    );
  }
};

const updateClientUser = async (params, body) => {
  try {
    const isClientExist = await clients.findOne({
      where: {
        id: params.clientId,
      },
    });
    if (isClientExist) {
      const data = {
        brandName: body?.brandName,
        brandCategory: body?.brandCategory,
        brandRegion: body?.brandRegion,
        brandRequirement: body?.brandRequirement,
        title: body?.title,
      };
      const result = await isClientExist.update(data);
      if (result) {
        return successResponse(
          statusCode.SUCCESS.CREATED,
          "Client Updated Successfully!"
        );
      }
    } else {
      return rejectResponse(
        statusCode.CLIENT_ERROR.NOT_FOUND,
        "Client doesn't exist!"
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
  getClientsUser,
  addClientUser,
  deleteClientUser,
  updateClientUser,
};
