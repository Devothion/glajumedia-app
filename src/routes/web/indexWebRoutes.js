const express = require("express");
const { index, getEncuesta } = require("../../controllers/web/indexWebController");

const router = express.Router();

router.get("/", index);
router.get("/:id", getEncuesta);

module.exports = router;