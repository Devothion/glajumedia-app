const express = require("express");
const { index } = require("../../controllers/admin/indexWebController");
const { ensureAuthenticated } = require("../../middleware/admin/auth");

const router = express.Router();

router.get("/", ensureAuthenticated, index);

module.exports = router;