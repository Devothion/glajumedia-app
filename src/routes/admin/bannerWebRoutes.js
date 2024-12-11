const express = require("express");
const upload = require("../../middleware/admin/upload");
const multerErrorHandler = require("../../middleware/admin/multerErrorHandler");
const { getAllBanners, createBanner, storeBanner, editBanner, updateBanner, deleteBanner } = require("../../controllers/admin/bannerWebController");
const { ensureAuthenticated } = require("../../middleware/admin/auth");

const router = express.Router();

router.get("/", ensureAuthenticated, getAllBanners);
router.get("/create", ensureAuthenticated, createBanner);
router.post("/create", ensureAuthenticated, upload.single("image"), multerErrorHandler, storeBanner);
router.get("/update/:id", ensureAuthenticated, editBanner);
router.put("/update/:id", ensureAuthenticated, upload.single("image"), multerErrorHandler, updateBanner);
router.delete("/delete/:id", ensureAuthenticated, deleteBanner);

module.exports = router;
