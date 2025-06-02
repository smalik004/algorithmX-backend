const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/dbConfig");

const clientMetrices = sequelize.define("client_metrices", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  avgRatings: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  conversionRate: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  totalOrders: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  repeatPurchases: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  orderFulfilledPerDay: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  sessionRevenueUplift: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

// sequelize
//   .sync()
//   .then(() => {
//     console.log("client_metrices table created successfully.");
//   })
//   .catch((err) => {
//     console.error("Error creating table:", err);
//   });

module.exports = clientMetrices;
