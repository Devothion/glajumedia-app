const express = require("express");
const { index } = require("../../controllers/admin/indexWebController");

const router = express.Router();

router.get("/", index);

module.exports = router;