const express = require("express");
const router = express.Router();
const {
  getClients,
  addClient,
  deleteClient,
  updateClient,
} = require("../controllers/clientController");
const { isAuthorized } = require("../middleware/authMiddleware");

router.get("/", getClients);
router.post("/", isAuthorized, addClient);
router.patch("/:clientId", isAuthorized, deleteClient);
router.put("/:clientId", isAuthorized, updateClient);

module.exports = router;
