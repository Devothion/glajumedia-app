const express = require("express");
const upload = require("../../middleware/admin/upload");
const multerErrorHandler = require("../../middleware/admin/multerErrorHandler");
const { getAllBanners, createBanner, storeBanner, editBanner, updateBanner, deleteBanner } = require("../../controllers/admin/bannerWebController");

const router = express.Router();

router.get("/", getAllBanners);
router.get("/create", createBanner);
router.post("/create", upload.single("image"), multerErrorHandler, storeBanner);
router.get("/update/:id", editBanner);
router.put("/update/:id", upload.single("image"), multerErrorHandler, updateBanner);
router.delete("/delete/:id", deleteBanner);

module.exports = router;
