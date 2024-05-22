// routes/userRoutes.js
const express = require("express");
const userController = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// Criar
router.post("/create", authMiddleware, userController.createUser);
// Buscar por ID
// router.get("/read", authMiddleware, userController.getUserById);
router.get("/read", authMiddleware, userController.getUser);
// Buscar todos os usuários
router.get("/list", authMiddleware, userController.getAllUsers);
// Atualizar usuário
router.put("/update", authMiddleware, userController.updateUser);
// Deletar usuário
router.delete("/delete/:id", authMiddleware, userController.deleteUser);

module.exports = router;