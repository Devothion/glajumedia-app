const express = require("express");
const upload = require("../../middleware/admin/upload");
const multerErrorHandler = require("../../middleware/admin/multerErrorHandler");
const { showBrand, editBrand, updateBrand } = require("../../controllers/admin/brandWebController");
const { ensureAuthenticated } = require("../../middleware/admin/auth");

const router = express.Router();

router.get("/", ensureAuthenticated, showBrand);
router.get("/update/", ensureAuthenticated, editBrand);
router.put("/update/", ensureAuthenticated, upload.single("image"), multerErrorHandler, updateBrand);

module.exports = router;