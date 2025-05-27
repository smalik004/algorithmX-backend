const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/dbConfig");

const glossary = sequelize.define("glossary", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  keyword: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  summary: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

// sequelize
//   .sync({ force: false })
//   .then(() => {
//     console.log("glossary table created successfully.");
//   })
//   .catch((err) => {
//     console.error("Error creating table:", err);
//   });

module.exports = glossary;
