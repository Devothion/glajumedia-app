const express = require("express");
const { getAllEncuestas, createEncuesta, storeEncuesta, editEncuesta, updateEncuesta, deleteEncuesta } = require("../../controllers/admin/encuestaWebController");
const { ensureAuthenticated } = require("../../middleware/admin/auth");

const router = express.Router();

router.get("/", ensureAuthenticated, getAllEncuestas);
router.get("/create", ensureAuthenticated, createEncuesta);
router.post("/create", ensureAuthenticated, storeEncuesta);
router.get("/update/:id", ensureAuthenticated, editEncuesta);
router.put("/update/:id", ensureAuthenticated, updateEncuesta);
router.delete("/delete/:id", ensureAuthenticated, deleteEncuesta);

module.exports = router;