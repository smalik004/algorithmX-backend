const express = require("express");
const router = express.Router();
const { signIn, signOut } = require("../controllers/authController");

router.post("/sign-in", signIn);
router.post("/sign-out", signOut);

module.exports = router;