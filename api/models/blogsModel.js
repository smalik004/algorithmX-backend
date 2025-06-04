const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/dbConfig");
const users = require("./userModel");
const blogCategories = require("./blogCategoriesModel");

const blogs = sequelize.define("blogs", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  blog_id: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  slug: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  meta_description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  meta_tags: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
  },
  meta_keywords: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
  },
  summary: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  image_url: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  image_alt: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  category_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  tags: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
  },
  post_date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  author_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  author_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  author_ip: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  views: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  status: {
    type: DataTypes.ENUM("draft", "published", "archived"),
    defaultValue: "draft",
  },
  is_featured: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
});

blogs.belongsTo(users, { foreignKey: "author_id" });
blogs.belongsTo(blogCategories, {
  foreignKey: "category_id",
  as: "category",
});

sequelize
  .sync({ force: true })
  .then(() => {
    console.log("blogs table created successfully.");
  })
  .catch((err) => {
    console.error("Error creating table:", err);
  });

module.exports = blogs;
