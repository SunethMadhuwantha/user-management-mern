const express = require('express');
const router = express.Router();

const User = require("../Models/UserModel");
const UserController = require("../Controllers/UserControllers")


router.get("/",UserController.getAllUsers);
router.post("/",UserController.addUsers);
router.get("/:id",UserController.getByID);
router.put("/:id",UserController.updateUser);
router.delete("/:id",UserController.deleteUser);


module.exports = router ;