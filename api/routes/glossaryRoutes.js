const express = require("express");
const router = express.Router();
const {
  getGlossaries,
  addGlossary,
  updateGlossary,
  deleteGlossary,
} = require("../controllers/glossaryController");
const { isAuthorized } = require("../middleware/authMiddleware");

router.get("/glossaries", getGlossaries);
router.post("/", isAuthorized, addGlossary);
router.put("/:glossaryId", isAuthorized, updateGlossary);
router.delete("/:glossaryId", isAuthorized, deleteGlossary);

module.exports = router;
