const express = require("express");
const { getAllEncuestas, createEncuesta,updateEncuesta, deleteEncuesta } = require("../../controllers/API/encuestaController");

const router = express.Router();

router.get("/", getAllEncuestas);
router.post("/", createEncuesta);
router.put("/:id", updateEncuesta);
router.delete("/:id", deleteEncuesta);

module.exports = router;