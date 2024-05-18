// routes/userRoutes.js
const express = require("express");
const userController = require("../controllers/userController");
const authenticate = require("../middlewares/authenticate");

const router = express.Router();

router.post("/users", authenticate, userController.createUser);
router.get("/users/:id", authenticate, userController.getUserById);
router.get("/users", authenticate, userController.getAllUsers);
router.put("/users/:id", authenticate, userController.updateUser);
router.delete("/users/:id", authenticate, userController.deleteUser);

module.exports = router;
