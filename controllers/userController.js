// controllers/userController.js
const User = require("../models/userModel");

const userController = {

  
  // Criar Usuário (Create)
  createUser: (req, res) => {
    const newUser = {
      nome: req.body.nome,
      email: req.body.email,
      password: req.body.password,
    };

    User.create(newUser, (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ id: result.insertId, ...newUser });
    });
  },
  // Buscar usuário por ID (Read)
  getUserById: (req, res) => {
    User.findById(req.params.id, (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (result.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(result[0]);
    });
  },
  // Buscar todos os usuários (Read)
  // getAllUsers: (req, res) => {
  //   User.findAll((err, results) => {
  //     if (err) {
  //       return res.status(500).json({ error: err.message });
  //     }
  //     res.json(results);
  //   });
  // },
  // Alterar os dados (Update)
  updateUser: (req, res) => {
    const updatedUser = {};

    if (req.body.nome) {
      updatedUser.nome = req.body.nome;
    }

    if (req.body.email) {
      updatedUser.email = req.body.email;
    }

    if (req.body.password) {
      updatedUser.password = req.body.password;
    }

    User.update(req.params.id, updatedUser, (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json({ id: req.params.id, ...updatedUser });
    });
  },
  // Deletar usuário (Delete)
  deleteUser: (req, res) => {
    User.delete(req.params.id, (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(204).end();
    });
  },
};

module.exports = userController;