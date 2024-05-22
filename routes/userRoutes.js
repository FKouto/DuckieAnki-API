// routes/userRoutes.js
const express = require("express");
const userController = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// Criar
router.post("/create", authMiddleware, userController.createUser);
// Buscar por ID
router.get("/read/:id", authMiddleware, userController.getUserById);
// Buscar todos os usuários
// router.get("/list", authMiddleware, userController.getAllUsers);
// Atualizar usuário
router.put("/update/:id", authMiddleware, userController.updateUser);
// Deletar usuário
router.delete("/delete/:id", authMiddleware, userController.deleteUser);

module.exports = router;