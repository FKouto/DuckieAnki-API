const db = require("../config/database");

class DeckModel {
  static insertDecks(userId, decks, callback) {
    const { Decks } = decks.UserDecks;

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

    callback(null, { message: "Decks inserted successfully" });
  }

  static getDecks(userId, callback) {
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
  }

  static deleteDecks(userId, deckId, callback) {
    const deleteResponsesQuery = `
      DELETE r FROM Responses r
      INNER JOIN Questions q ON r.questionId = q.questionId
      WHERE q.deckId = ?
    `;
    db.query(deleteResponsesQuery, [deckId], (err, result) => {
      if (err) {
        return callback(err);
      }

      const deleteQuestionsQuery = "DELETE FROM Questions WHERE deckId = ?";
      db.query(deleteQuestionsQuery, [deckId], (err, result) => {
        if (err) {
          return callback(err);
        }

        const deleteDeckQuery = "DELETE FROM Decks WHERE deckId = ?";
        db.query(deleteDeckQuery, [deckId], (err, result) => {
          if (err) {
            return callback(err);
          }

          callback(null, { message: "Decks deleted successfully" });
        });
      });
    });
  }

  static updateDecks(userId, deckId, updatedDeck, callback) {
    const { questions } = updatedDeck;

    const deckQuery = "UPDATE Decks SET userId = ? WHERE deckId = ?";
    db.query(deckQuery, [userId, deckId], (err, result) => {
      if (err) return callback(err);

      questions.forEach((question) => {
        const { questionId, question: questionText, responses, correctAnswer } = question;

        const questionQuery =
          "UPDATE Questions SET question = ?, correctAnswer = ? WHERE questionId = ? AND deckId = ?";
        db.query(questionQuery, [questionText, correctAnswer, questionId, deckId], (err, result) => {
          if (err) return callback(err);

          const deleteResponsesQuery = "DELETE FROM Responses WHERE questionId = ?";
          db.query(deleteResponsesQuery, [questionId], (err, result) => {
            if (err) return callback(err);

            responses.forEach((response) => {
              const responseQuery = "INSERT INTO Responses (questionId, response) VALUES (?, ?)";
              db.query(responseQuery, [questionId, response], (err, result) => {
                if (err) return callback(err);
              });
            });
          });
        });
      });

      callback(null, { message: "Deck updated successfully" });
    });
  }
}

module.exports = DeckModel;
