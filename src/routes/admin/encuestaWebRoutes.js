const express = require("express");
const { getAllEncuestas, createEncuesta, storeEncuesta, editEncuesta, updateEncuesta, deleteEncuesta } = require("../../controllers/admin/encuestaWebController");

const router = express.Router();

router.get("/", getAllEncuestas);
router.get("/create", createEncuesta);
router.post("/create", storeEncuesta);
router.get("/update/:id", editEncuesta);
router.put("/update/:id", updateEncuesta);
router.delete("/delete/:id", deleteEncuesta);

module.exports = router;