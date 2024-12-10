const express = require("express");
const { getAllUsers, createUser, storeUser, editUser, updateUser, deleteUser } = require("../../controllers/admin/userWebController");

const router = express.Router();

router.get("/", getAllUsers);
router.get("/create", createUser);
router.post("/create", storeUser);
router.get("/update/:id", editUser);
router.put("/update/:id", updateUser);
router.delete("/delete/:id", deleteUser);

module.exports = router;