// server.js
const express = require("express");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const flashcardRoutes = require("./routes/flashcardRoutes");

dotenv.config();

const app = express();

app.use(express.json());
app.use("/api", userRoutes);
app.use("/auth", authRoutes);
app.use("/api", flashcardRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
