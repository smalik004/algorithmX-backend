require("dotenv").config({ path: "./.env" });
const PORT = process.env.SERVER_PORT || 5000;
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const routes = require("./api/routes/index");
const { testConnection } = require("./api/db/dbConfig");
testConnection();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use('/blog-images', express.static('public/blog-images'));
const clientImagesPath = path.join(__dirname, "public/client-media");

app.use(
  "/client-media",
  (req, res, next) => {
    const ext = path.extname(req.path);
    if (ext === ".mp4" || ext === ".webm" || ext === ".mov") {
      res.setHeader("Content-Type", "video/mp4");
      res.setHeader("Content-Disposition", "inline");
    }
    next();
  },
  express.static(clientImagesPath)
);

app.use("/api", routes);

app.listen(PORT, () => {
  console.log(`Backend listening at port: ${PORT}`);
});

module.exports = app;
