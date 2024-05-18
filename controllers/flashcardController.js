// controllers/flashcardController.js
const db = require("../config/db");

const insertFlashcards = (userId, flashcards, callback) => {
  const { Decks } = flashcards.UserDecks;

  // Adiciona os decks e as questões associadas ao usuário fornecido
  Decks.forEach((deck) => {
    const { deckId, questions } = deck;

    const deckQuery = "INSERT INTO Decks (deckId, userId) VALUES (?, ?)";
    db.query(deckQuery, [deckId, userId], (err, result) => {
      if (err) return callback(err);

      questions.forEach((question) => {
        const { question: questionText, responses, correctAnswer } = question;

        const questionQuery =
          "INSERT INTO Questions (deckId, question, correctAnswer) VALUES (?, ?, ?)";
        db.query(
          questionQuery,
          [deckId, questionText, correctAnswer],
          (err, result) => {
            if (err) return callback(err);

            const questionId = result.insertId;

            responses.forEach((response) => {
              const responseQuery =
                "INSERT INTO Responses (questionId, response) VALUES (?, ?)";
              db.query(responseQuery, [questionId, response], (err, result) => {
                if (err) return callback(err);
              });
            });
          }
        );
      });
    });
  });

  callback(null, { message: "Flashcards inserted successfully" });
};

// Função para ler flashcards de um usuário
const getFlashcards = (userId, callback) => {
  const query = `
      SELECT
          d.deckId,
          q.question,
          GROUP_CONCAT(r.response) AS responses,
          q.correctAnswer
      FROM
          Decks d
      JOIN
          Questions q ON d.deckId = q.deckId
      JOIN
          Responses r ON q.questionId = r.questionId
      WHERE
          d.userId = ?
      GROUP BY
          d.deckId, q.question, q.correctAnswer
    `;

  db.query(query, [userId], (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(null, result);
  });
};

// Função para atualziar flashcards de um usuário
const updateFlashcard = (
  questionId,
  question,
  responses,
  correctAnswer,
  callback
) => {
  const updateQuestionQuery = `UPDATE Questions 
                                 SET question = ?, correctAnswer = ? 
                                 WHERE questionId = ?`;
  db.query(
    updateQuestionQuery,
    [question, correctAnswer, questionId],
    (err, result) => {
      if (err) {
        return callback(err);
      }
      const deleteResponsesQuery = `DELETE FROM Responses WHERE questionId = ?`;
      db.query(deleteResponsesQuery, [questionId], (err, result) => {
        if (err) {
          return callback(err);
        }
        const insertResponsesQuery = `INSERT INTO Responses (questionId, response) 
                                           VALUES (?, ?), (?, ?), (?, ?)`;
        const responseValues = responses.flatMap((response) => [
          questionId,
          response,
        ]);
        db.query(insertResponsesQuery, responseValues, (err, result) => {
          if (err) {
            return callback(err);
          }
          callback(null, { message: "Questão atualizada com sucesso" });
        });
      });
    }
  );
};

// Função para excluir flashcards de um usuário
const deleteFlashcards = (userId, deckId, callback) => {
  // Excluir respostas associadas às perguntas do deck
  const deleteResponsesQuery = `
      DELETE r FROM Responses r
      INNER JOIN Questions q ON r.questionId = q.questionId
      WHERE q.deckId = ?
    `;
  db.query(deleteResponsesQuery, [deckId], (err, result) => {
    if (err) {
      return callback(err);
    }

    // Em seguida, exclua as perguntas do deck
    const deleteQuestionsQuery = "DELETE FROM Questions WHERE deckId = ?";
    db.query(deleteQuestionsQuery, [deckId], (err, result) => {
      if (err) {
        return callback(err);
      }

      // Finalmente, exclua o deck em si
      const deleteDeckQuery = "DELETE FROM Decks WHERE deckId = ?";
      db.query(deleteDeckQuery, [deckId], (err, result) => {
        if (err) {
          return callback(err);
        }

        callback(null, { message: "Flashcards deleted successfully" });
      });
    });
  });
};

module.exports = {
  insertFlashcards,
  getFlashcards,
  updateFlashcard,
  deleteFlashcards,
};
