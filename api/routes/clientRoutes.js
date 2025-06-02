const express = require("express");
const router = express.Router();
const {
  getClients,
  addClient,
  deleteClient,
  updateClient,
} = require("../controllers/clientController");
const { isAuthorized } = require("../middleware/authMiddleware");
const { dynamicUpload } = require("../middleware/mediaUploadMiddleware");

router.get("/", getClients);
router.post(
  "/",
  isAuthorized,
  dynamicUpload(
    [
      { name: "brandLogo" },
      { name: "brandImage" },
      { name: "aboutImages" },
      { name: "solutionImage" },
      { name: "clientImage" },
      { name: "wireFrameImages" },
      { name: "prototypeImages" },
      { name: "techstackImages" },
      { name: "projectGoalImage" },
      { name: "brandVideo" },
      { name: "resultPointerImages" },
      { name: "optimizationImages" },
    ],
    "client-media"
  ),
  addClient
);

router.patch("/:clientId", isAuthorized, deleteClient);
router.put(
  "/:clientId",
  isAuthorized,
  dynamicUpload(
    [
      { name: "brandLogo" },
      { name: "brandImage" },
      { name: "aboutImages" },
      { name: "solutionImage" },
      { name: "clientImage" },
      { name: "wireFrameImages" },
      { name: "prototypeImages" },
      { name: "techstackImages" },
      { name: "projectGoalImage" },
      { name: "brandVideo" },
      { name: "resultPointerImages" },
      { name: "optimizationImages" },
    ],
    "client-media"
  ),
  updateClient
);

module.exports = router;
