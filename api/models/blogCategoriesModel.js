const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/dbConfig");

const blogCategories = sequelize.define("blog_categories", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// sequelize
//   .sync({ force: true })
//   .then(() => {
//     console.log("blog_categories table created successfully.");
//   })
//   .catch((err) => {
//     console.error("Error creating table:", err);
//   });

module.exports = blogCategories;
