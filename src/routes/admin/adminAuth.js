const express = require("express");
const { showLogin, login, logout } = require("../../controllers/admin/adminAuthWebController");

const router = express.Router();

router.get("/login", showLogin);
router.post("/login", login);
router.get("/logout", logout);

module.exports = router;
