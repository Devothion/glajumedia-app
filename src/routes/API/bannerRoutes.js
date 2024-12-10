const express = require("express");
const upload = require("../../middleware/API/upload");
const multerErrorHandler = require("../../middleware/API/multerErrorHandler");
const { createBanner } = require("../../controllers/API/bannerController");

const router = express.Router();

router.post("/create", upload.single("image"), multerErrorHandler, createBanner);

module.exports = router;