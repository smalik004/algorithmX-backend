const express = require("express");
const router = express.Router();
const {
  getClients,
  addClient,
  deleteClient,
  updateClient,
} = require("../controllers/clientController");
const { isAuthorized } = require("../middleware/authMiddleware");

router.get("/", isAuthorized, getClients);
router.post("/", addClient);
router.patch("/:clientId", deleteClient);
router.put("/:clientId", updateClient);

module.exports = router;
