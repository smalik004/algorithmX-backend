const { rejectResponse, successResponse } = require("../utils/response");
const { statusCode } = require("../utils/statusCode");
const clients = require("../models/clientsModel");
const clientMetrices = require("../models/clientMetricesModel");

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

const addClientUser = async (payload, req) => {
  try {
    const metricesData = {
      avgRatings: payload?.avgRatings,
      conversionRate: payload?.conversionRate,
      totalOrders: payload?.totalOrders,
      repeatPurchases: payload?.repeatPurchases,
      orderFulfilledPerDay: payload?.orderFulfilledPerDay,
      sessionRevenueUplift: payload?.sessionRevenueUplift,
    };
    const addMetrices = await clientMetrices.create(metricesData);
    if (addMetrices) {
      const brandLogoFile = req.files?.brandLogo[0]?.filename;
      const brandImageFile = req.files?.brandImage[0]?.filename;
      const brandVideoFile = req.files?.brandVideo[0]?.filename;
      const solutionImageFile = req.files?.solutionImage[0]?.filename;
      const clientImageFile = req.files?.clientImage[0]?.filename;
      const projectGoalImageFile = req.files?.projectGoalImage[0]?.filename;
      const resultPointerImages = req.files?.resultPointerImages || [];
      const optimizationImages = req.files?.optimizationImages || [];
      let resultPointers = [];
      let optimizationPointers = [];

      resultPointers = JSON.parse(req.body.resultPointers);
      optimizationPointers = JSON.parse(req.body.optimizationPointers);

      resultPointers = resultPointers?.map((pointer, index) => ({
        ...pointer,
        img:
          `${process.env.BASE_URL}/client-media/${resultPointerImages[index]?.filename}` ||
          null,
      }));

      optimizationPointers = optimizationPointers?.map((pointer, index) => ({
        ...pointer,
        img:
          `${process.env.BASE_URL}/client-media/${optimizationImages[index]?.filename}` ||
          null,
      }));

      let aboutImgURLs = [];
      let wireFrameURLs = [];
      let prototypeURLs = [];
      let techStackURLs = [];
      req?.files?.aboutImages?.map((item) => {
        aboutImgURLs.push(
          `${process.env.BASE_URL}/client-media/${item?.filename}`
        );
      });
      req?.files?.wireFrameImages?.map((item) => {
        wireFrameURLs.push(
          `${process.env.BASE_URL}/client-media/${item?.filename}`
        );
      });
      req?.files?.prototypeImages?.map((item) => {
        prototypeURLs.push(
          `${process.env.BASE_URL}/client-media/${item?.filename}`
        );
      });
      req?.files?.techstackImages?.map((item) => {
        techStackURLs.push(
          `${process.env.BASE_URL}/client-media/${item?.filename}`
        );
      });

      const data = {
        productType: payload?.productType,
        brandName: payload?.brandName,
        brandRGB: payload?.brandRGB,
        brandVideoURL: `${process.env.BASE_URL}/client-media/${brandVideoFile}`,
        brandVideoTitle: payload?.brandVideoTitle,
        brandIndustry: payload?.brandIndustry,
        brandServices: payload?.brandServices,
        brandType: payload?.brandType,
        brandLogoURL: `${process.env.BASE_URL}/client-media/${brandLogoFile}`,
        brandImageURL: `${process.env.BASE_URL}/client-media/${brandImageFile}`,
        brandAboutDesc: payload?.brandAboutDesc,
        aboutImgURLs,
        solutionImgURL: `${process.env.BASE_URL}/client-media/${solutionImageFile}`,
        solutionTitle: payload?.solutionTitle,
        solutionDesc: payload?.solutionDesc,
        clientImgURL: `${process.env.BASE_URL}/client-media/${clientImageFile}`,
        clientName: payload?.clientName,
        clientDesignation: payload?.clientDesignation,
        clientTestimonial: payload?.clientTestimonial,
        resultTitle: payload?.resultTitle,
        resultPointers: JSON.stringify(resultPointers),
        businessProcess: JSON.stringify(payload.businessProcess),
        wireFrameURLs,
        prototypeURLs,
        techStackTitle: payload?.techStackTitle,
        techStackURLs,
        projectGoals: JSON.stringify(payload.projectGoals),
        projectGoalImgURL: `${process.env.BASE_URL}/client-media/${projectGoalImageFile}`,
        optimizationTitle: payload?.optimizationTitle,
        optimizationDesc: payload?.optimizationDesc,
        optimizationPointers: JSON.stringify(optimizationPointers),
        metricesId: addMetrices?.id,
      };

      const result = await clients.create(data);
      if (result) {
        return successResponse(
          statusCode.SUCCESS.CREATED,
          "Client Added Successfully!"
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

const updateClientUser = async (params, payload) => {
  try {
    const isClientExist = await clients.findOne({
      where: {
        id: params.clientId,
      },
    });
    if (isClientExist) {
      const isMetricesExist = await clientMetrices.findOne({
        where: {
          id: payload.metricesId,
        },
      });
      if (isMetricesExist) {
        const metricesData = {
          avgRatings: payload?.avgRatings,
          conversionRate: payload?.conversionRate,
          totalOrders: payload?.totalOrders,
          repeatPurchases: payload?.repeatPurchases,
          orderFulfilledPerDay: payload?.orderFulfilledPerDay,
          sessionRevenueUplift: payload?.sessionRevenueUplift,
        };
        await isMetricesExist.update(metricesData);
      }
      const brandLogoFile = req.files?.brandLogo[0]?.filename;
      const brandImageFile = req.files?.brandImage[0]?.filename;
      const brandVideoFile = req.files?.brandVideo[0]?.filename;
      const solutionImageFile = req.files?.solutionImage[0]?.filename;
      const clientImageFile = req.files?.clientImage[0]?.filename;
      const projectGoalImageFile = req.files?.projectGoalImage[0]?.filename;
      const resultPointerImages = req.files?.resultPointerImages || [];
      const optimizationImages = req.files?.optimizationImages || [];
      let resultPointers = [];
      let optimizationPointers = [];

      resultPointers = JSON.parse(req.body.resultPointers);
      optimizationPointers = JSON.parse(req.body.optimizationPointers);

      resultPointers = resultPointers?.map((pointer, index) => ({
        ...pointer,
        img:
          `${process.env.BASE_URL}/client-media/${resultPointerImages[index]?.filename}` ||
          null,
      }));

      optimizationPointers = optimizationPointers?.map((pointer, index) => ({
        ...pointer,
        img:
          `${process.env.BASE_URL}/client-media/${optimizationImages[index]?.filename}` ||
          null,
      }));

      let aboutImgURLs = [];
      let wireFrameURLs = [];
      let prototypeURLs = [];
      let techStackURLs = [];
      req?.files?.aboutImages?.map((item) => {
        aboutImgURLs.push(
          `${process.env.BASE_URL}/client-media/${item?.filename}`
        );
      });
      req?.files?.wireFrameImages?.map((item) => {
        wireFrameURLs.push(
          `${process.env.BASE_URL}/client-media/${item?.filename}`
        );
      });
      req?.files?.prototypeImages?.map((item) => {
        prototypeURLs.push(
          `${process.env.BASE_URL}/client-media/${item?.filename}`
        );
      });
      req?.files?.techstackImages?.map((item) => {
        techStackURLs.push(
          `${process.env.BASE_URL}/client-media/${item?.filename}`
        );
      });
      const data = {
        brandName: payload?.brandName,
        brandRGB: payload?.brandRGB,
        brandVideoURL: `${process.env.BASE_URL}/client-media/${brandVideoFile}`,
        brandVideoTitle: payload?.brandVideoTitle,
        brandIndustry: payload?.brandIndustry,
        brandServices: payload?.brandServices,
        brandType: payload?.brandType,
        brandLogoURL: `${process.env.BASE_URL}/client-media/${brandLogoFile}`,
        brandImageURL: `${process.env.BASE_URL}/client-media/${brandImageFile}`,
        brandAboutDesc: payload?.brandAboutDesc,
        aboutImgURLs,
        solutionImgURL: `${process.env.BASE_URL}/client-media/${solutionImageFile}`,
        solutionTitle: payload?.solutionTitle,
        solutionDesc: payload?.solutionDesc,
        clientImgURL: `${process.env.BASE_URL}/client-media/${clientImageFile}`,
        clientName: payload?.clientName,
        clientDesignation: payload?.clientDesignation,
        clientTestimonial: payload?.clientTestimonial,
        resultTitle: payload?.resultTitle,
        resultPointers: JSON.stringify(resultPointers),
        businessProcess: JSON.stringify(payload.businessProcess),
        wireFrameURLs,
        prototypeURLs,
        techStackTitle: payload?.techStackTitle,
        techStackURLs,
        projectGoals: JSON.stringify(payload.projectGoals),
        projectGoalImgURL: `${process.env.BASE_URL}/client-media/${projectGoalImageFile}`,
        optimizationTitle: payload?.optimizationTitle,
        optimizationDesc: payload?.optimizationDesc,
        optimizationPointers: JSON.stringify(optimizationPointers),
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
