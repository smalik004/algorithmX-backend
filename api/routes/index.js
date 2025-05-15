const express = require("express");
const router = express.Router();
const authRoutes = require("./authRoutes");
const blogRoutes = require("./blogRoutes");

router.get("/", (req, res) => {
  res.send("Welcome to Algo backend");
});

router.use("/auth", authRoutes);
router.use("/blog", blogRoutes);

module.exports = router;
