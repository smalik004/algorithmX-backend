const express = require("express");
const router = express.Router();
const {
  getClients,
  addClient,
  deleteClient,
  updateClient,
} = require("../controllers/clientController");
const { isAuthorized } = require("../middleware/authMiddleware");

router.get("/get-clients", isAuthorized, getClients);
router.post("/add-client", addClient);
router.put("/delete-client/:clientId", deleteClient);
router.put("/update-client/:clientId", updateClient);

module.exports = router;
