const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/dbConfig");
const clientMetrices = require("./clientMetricesModel");

const clients = sequelize.define("clients", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  productType: {
    type: DataTypes.ENUM("mobile", "web"),
    allowNull: false,
  },
  brandName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  brandVideoURL: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  brandRGB: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  brandVideoTitle: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  brandIndustry: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  brandServices: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  brandType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  brandLogoURL: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  brandImageURL: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  brandAboutDesc: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  aboutImgURLs: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  solutionImgURL: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  solutionTitle: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  solutionDesc: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  clientImgURL: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  clientName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  clientDesignation: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  clientTestimonial: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  resultTitle: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  resultPointers: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  businessProcess: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  wireFrameURLs: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  prototypeURLs: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  techStackTitle: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  techStackURLs: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  projectGoals: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  projectGoalImgURL: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  optimizationTitle: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  optimizationDesc: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  optimizationPointers: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  metricesId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
});

clients.belongsTo(clientMetrices, { foreignKey: "metricesId" });

// sequelize
//   .sync({ force: false })
//   .then(() => {
//     console.log("clients table created successfully.");
//   })
//   .catch((err) => {
//     console.error("Error creating table:", err);
//   });

module.exports = clients;
