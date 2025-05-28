const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/dbConfig");

const blogViews = sequelize.define("blog_views", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  blog_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  device_token: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// sequelize
//   .sync()
//   .then(() => {
//     console.log("blogViews table created successfully.");
//   })
//   .catch((err) => {
//     console.error("Error creating table:", err);
//   });

module.exports = blogViews;
