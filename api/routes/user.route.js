const express = require("express");
const router = express.Router();

const UserController = require("../controller/user.controller");
const authChecker = require("../middleware/auth-check");

router.get("/", UserController.getAllUsers);

router.post("/sign-up", UserController.userSignUp);

router.post("/login", UserController.userLogin);

router.delete("/:userId", UserController.deleteUser);

router.patch("/:userId", authChecker, UserController.updateUser);

router.post("/logout", UserController.signout);

module.exports = router;
