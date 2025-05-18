require("dotenv").config({ path: "./.env" });
const PORT = process.env.SERVER_PORT || 5000;
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require('cors')
const routes = require("./api/routes/index");
const { testConnection } = require("./api/db/dbConfig");
testConnection();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
// app.use('/blog-images', express.static('public/blog-images'));
app.use(express.static('public'));

app.use("/api", routes);

app.listen(PORT, () => {
  console.log(`Backend listening at port: ${PORT}`);
});

module.exports = app;
