const express = require("express");
const {
  insertDecks,
  getDecks,
  deleteDecks,
  updateDecks, // Importe a função updateDecks
} = require("../controllers/deckController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// Criar Deck (Create)
router.post("/create", authMiddleware, (req, res) => {
  const userId = req.user.id; // Extrai o ID do usuário do token JWT
  const decks = req.body;

  insertDecks(userId, decks, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json(result);
  });
});

// Buscar decks (Read)
router.get("/read", authMiddleware, (req, res) => {
  const userId = req.user.id;

  getDecks(userId, (err, decks) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(decks);
  });
});

// Deletar deck (Delete)
router.delete("/delete/:deckId", authMiddleware, (req, res) => {
  const userId = req.user.id;
  const deckId = req.params.deckId;

  deleteDecks(userId, deckId, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(result);
  });
});

// Atualizar deck (Update)
router.put("/update/:deckId", authMiddleware, (req, res) => {
  const userId = req.user.id;
  const deckId = req.params.deckId;
  const updatedDeck = req.body;

  updateDecks(userId, deckId, updatedDeck, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(result);
  });
});

module.exports = router;