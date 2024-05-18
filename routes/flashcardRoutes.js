const express = require("express");
const {
  insertFlashcards,
  getFlashcards,
  updateFlashcard,
  deleteFlashcards,
} = require("../controllers/flashcardController");
const authenticate = require("../middlewares/authenticate");

const router = express.Router();

// Rota para inserir flashcards
router.post("/flashcards", authenticate, (req, res) => {
  const userId = req.user.id; // Extrai o ID do usuário do token JWT
  const flashcards = req.body;

  insertFlashcards(userId, flashcards, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json(result);
  });
});

// Rota para ler flashcards
router.get("/flashcards", authenticate, (req, res) => {
  const userId = req.user.id;

  getFlashcards(userId, (err, flashcards) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(flashcards);
  });
});

// Rota para atualizar flashcards
router.put("/flashcards/:deckId", authenticate, (req, res) => {
  const userId = req.user.id;
  const deckId = req.params.deckId;
  const action = req.query.action; // Query param para especificar a ação (add, update ou delete)
  const updatedFlashcard = req.body; // Dados atualizados do flashcard

  if (action === "add") {
    const insertQuestionQuery = `INSERT INTO Questions (deckId, question, correctAnswer)
                                   VALUES ('${deckId}', '${updatedFlashcard.question}', ${updatedFlashcard.correctAnswer})`;

    db.query(insertQuestionQuery, (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      const questionId = result.insertId;
      const insertResponsesQuery = `INSERT INTO Responses (questionId, response)
                                       VALUES (${questionId}, '${updatedFlashcard.responses[0]}'),
                                              (${questionId}, '${updatedFlashcard.responses[1]}'),
                                              (${questionId}, '${updatedFlashcard.responses[2]}')`;

      db.query(insertResponsesQuery, (err, result) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        res.json({ message: "Questão adicionada com sucesso" });
      });
    });
  } else if (action === "update") {
    const updateQuestionQuery = `UPDATE Questions 
                                   SET question = '${updatedFlashcard.question}', 
                                       correctAnswer = ${updatedFlashcard.correctAnswer}
                                   WHERE questionId = ${updatedFlashcard.questionId}`;

    db.query(updateQuestionQuery, (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ message: "Questão atualizada com sucesso" });
    });
  } else if (action === "delete") {
    const deleteResponsesQuery = `DELETE FROM Responses WHERE questionId = ${updatedFlashcard.questionId}`;

    db.query(deleteResponsesQuery, (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      const deleteQuestionQuery = `DELETE FROM Questions WHERE questionId = ${updatedFlashcard.questionId}`;

      db.query(deleteQuestionQuery, (err, result) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        res.json({ message: "Questão excluída com sucesso" });
      });
    });
  } else {
    res
      .status(400)
      .json({ error: 'Ação inválida. Use "add", "update" ou "delete".' });
  }
});

// Rota para excluir flashcards
router.delete("/flashcards/:deckId", authenticate, (req, res) => {
  const userId = req.user.id;
  const deckId = req.params.deckId;

  deleteFlashcards(userId, deckId, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(result);
  });
});

module.exports = router;
