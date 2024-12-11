const express = require("express");
const { getAllUsers, createUser, storeUser, editUser, updateUser, deleteUser } = require("../../controllers/admin/userWebController");
const { ensureAuthenticated } = require("../../middleware/admin/auth");

const router = express.Router();

router.get("/", ensureAuthenticated ,getAllUsers);
router.get("/create", ensureAuthenticated ,createUser);
router.post("/create", ensureAuthenticated ,storeUser);
router.get("/update/:id", ensureAuthenticated ,editUser);
router.put("/update/:id", ensureAuthenticated ,updateUser);
router.delete("/delete/:id", ensureAuthenticated ,deleteUser);

module.exports = router;