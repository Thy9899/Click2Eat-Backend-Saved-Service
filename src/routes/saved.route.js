const express = require("express");
const multer = require("multer");
const savedController = require("../controller/saved.controller");
const authenticateToken = require("../middleware/authMiddleware");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "./public/Images"),
  filename: (req, file, cb) => cb(null, `${Date.now()}_${file.originalname}`),
});

const upload = multer({ storage });

const router = express.Router();

// GET all
router.get("/saved", authenticateToken, savedController.GetAll);

// CREATE
router.post(
  "/saved",
  authenticateToken,
  upload.single("image"),
  savedController.create
);

// UPDATE
router.put(
  "/saved/:id",
  authenticateToken,
  upload.single("image"),
  savedController.update
);

// DELETE
router.delete("/saved/:id", authenticateToken, savedController.remove);

module.exports = router;
