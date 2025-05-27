const express = require("express");
const router = express.Router();
const {
  getGlossaries,
  addGlossary,
  updateGlossary,
  deleteGlossary,
  getGlossaryById,
} = require("../controllers/glossaryController");
const { isAuthorized } = require("../middleware/authMiddleware");

router.get("/glossaries", getGlossaries);
router.post("/", isAuthorized, addGlossary);
router.put("/:glossaryId", isAuthorized, updateGlossary);
router.delete("/:glossaryId", isAuthorized, deleteGlossary);
router.get("/glossaries/:glossaryId", getGlossaryById);

module.exports = router;
