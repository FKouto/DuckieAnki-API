const DeckModel = require("../models/deckModel");

const insertDecks = (userId, decks, callback) => {
  DeckModel.insertDecks(userId, decks, callback);
};

const getDecks = (userId, callback) => {
  DeckModel.getDecks(userId, callback);
};

const deleteDecks = (userId, deckId, callback) => {
  DeckModel.deleteDecks(userId, deckId, callback);
};

const updateDecks = (userId, deckId, updatedDeck, callback) => {
  DeckModel.updateDecks(userId, deckId, updatedDeck, callback);
};

module.exports = {
  insertDecks,
  getDecks,
  deleteDecks,
  updateDecks,
};
