const express = require("express");
const router = express.Router();
const authRoutes = require("./authRoutes");
const blogRoutes = require("./blogRoutes");
const clientRoutes = require("./clientRoutes");
const glossaryRoutes = require("./glossaryRoutes");

router.get("/", (req, res) => {
  res.send("Welcome to Algo backend");
});

router.use("/auth", authRoutes);
router.use("/blog", blogRoutes);
router.use("/clients", clientRoutes);
router.use("/blog-categories", blogRoutes);
router.use("/glossary", glossaryRoutes);

module.exports = router;
