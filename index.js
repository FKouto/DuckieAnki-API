const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const deckRoutes = require("./routes/deckRoutes");

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(express.json());
// Rotas
// Usuário autenticado
app.use("/user", userRoutes);
// Sem autenticação
app.use("/auth", authRoutes);
// Deck
app.use("/deck", deckRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
