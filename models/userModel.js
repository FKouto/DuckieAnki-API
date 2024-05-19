// models/userModel.js
const db = require("../config/db");
const bcrypt = require("bcryptjs");

const User = {
  create: (user, callback) => {
    bcrypt.hash(user.password, 10, (err, hash) => {
      if (err) return callback(err);
      const query =
        "INSERT INTO users (nome, email, password) VALUES (?, ?, ?)";
      db.query(query, [user.nome, user.email, hash], callback);
    });
  },
  findById: (id, callback) => {
    const query = "SELECT * FROM users WHERE id = ?";
    db.query(query, [id], callback);
  },  
  findByEmail: (email, callback) => {
    const query = "SELECT * FROM users WHERE email = ?";
    db.query(query, [email], callback);
  },
  findAll: (callback) => {
    const query = "SELECT * FROM users";
    db.query(query, callback);
  },
  update: (id, user, callback) => {
    bcrypt.hash(user.password, 10, (err, hash) => {
      if (err) return callback(err);
      const query =
        "UPDATE users SET nome = ?, email = ?, password = ? WHERE id = ?";
      db.query(
        query,
        [user.nome, user.email, hash, id],
        callback
      );
    });
  },
  delete: (id, callback) => {
    const query = "DELETE FROM users WHERE id = ?";
    db.query(query, [id], callback);
  },
};

module.exports = User;
