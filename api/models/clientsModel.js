const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/dbConfig");

const clients = sequelize.define("clients", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  brandLogo: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  brandName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  brandCategory: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  brandRegion: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  brandRequirement: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
});

// sequelize
//   .sync({ force: true })
//   .then(() => {
//     console.log("clients table created successfully.");
//   })
//   .catch((err) => {
//     console.error("Error creating table:", err);
//   });

module.exports = clients;
